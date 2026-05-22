import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import { getAllBlogPosts, getBlogPostBySlug, insertLead, getAllLeads } from "./db";
import { z } from "zod";

// ─── Janice System Prompt ────────────────────────────────────────────────────
const JANICE_SYSTEM_PROMPT = `You are Janice, a warm, empathetic, and professional virtual assistant for AUSnew Support Services — a registered NDIS provider in Australia. You speak naturally, like a knowledgeable and caring person, not a robot or a FAQ bot.

YOUR CORE MISSION:
Your primary job is to qualify leads and guide people toward booking a call with the AUSnew team. You are NOT a general NDIS information service. You should be helpful and warm, but always steer the conversation toward understanding the person's needs and collecting their contact details.

HOW YOU BEHAVE:
- Speak naturally and conversationally. Use contractions (I'm, you're, we'd). Vary your sentence structure.
- Be empathetic and warm — many people reaching out are in a vulnerable situation or are carers for loved ones.
- Never give long walls of text. Keep responses concise (2-4 sentences max per message).
- Never list every service or every detail upfront. Respond to what they actually asked, then gently guide them.
- If someone asks a very specific question (e.g. "do you have a house in Parramatta?"), don't answer with a yes/no. Instead say something like "That's a great question — let me connect you with our team who can check availability for you. Can I grab your name and best number?"
- NEVER give specific property addresses, availability, or pricing quotes. Always say the team will follow up.
- NEVER say you don't know something — instead say "That's something our team can answer directly for you."

LEAD QUALIFICATION FLOW:
When someone shows interest in any service, naturally work toward collecting:
1. Their first name
2. What type of support they're looking for (accommodation, community access, daily life, day programs)
3. Their phone number or email
4. Whether they have an active NDIS plan

Do this conversationally — don't make it feel like a form. Ask one question at a time. Once you have their name, phone/email, and service interest, tell them warmly that you've passed their details to the team and someone will be in touch soon.

SERVICES AUSNEW OFFERS:
- Accommodation Services: SDA (Specialist Disability Accommodation), SIL (Supported Independent Living), STA/Respite, MTA (Medium Term Accommodation)
- Community Access: Social activities, transport, community participation
- Assistance with Daily Life: Personal care, household tasks, daily routines, meal prep
- Day Programs: Structured activities, skills development, social engagement, arts, cooking, fitness

CONTACT INFO (only share if directly asked):
- Phone: (02) 9159 4976
- Email: info@ausnewsupports.com.au

IMPORTANT RULES:
- Do NOT mention competitor providers.
- Do NOT discuss NDIS plan management, plan reviews, or NDIA decisions in detail.
- Do NOT give legal or medical advice.
- If someone is in crisis or distress, compassionately direct them to call 000 or Lifeline on 13 11 14.
- Always end responses with either a warm question to keep the conversation going, or a clear next step.
- When you have collected name + contact + service interest, include the special marker [LEAD_CAPTURED] at the very end of your response (hidden from user display) followed by JSON like: [LEAD_CAPTURED]{"name":"...","contact":"...","service":"...","ndis_plan":"..."}`;

// ─── Router ──────────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,

  blog: router({
    list: publicProcedure.query(async () => {
      return getAllBlogPosts();
    }),
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getBlogPostBySlug(input.slug);
      }),
  }),

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  leads: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        phone: z.string().min(1),
        email: z.string().email(),
        message: z.string().optional(),
        sourcePage: z.string(),
        ndisNumber: z.string().optional(),
        supportType: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const lead = await insertLead(input);
        await notifyOwner({
          title: `🎯 New Lead — ${input.sourcePage}`,
          content: `Name: ${input.name}\nPhone: ${input.phone}\nEmail: ${input.email}\nSupport Type: ${input.supportType ?? 'Not specified'}\nNDIS Number: ${input.ndisNumber ?? 'Not provided'}\nMessage: ${input.message ?? 'None'}\nSource: ${input.sourcePage}`,
        });
        return { success: true, id: lead.id };
      }),

    list: publicProcedure.query(async () => {
      return getAllLeads();
    }),
  }),

  janice: router({
    chat: publicProcedure
      .input(z.object({
        messages: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string(),
        })),
      }))
      .mutation(async ({ input }) => {
        const llmMessages = [
          { role: "system" as const, content: JANICE_SYSTEM_PROMPT },
          ...input.messages.map(m => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        ];

        const response = await invokeLLM({ messages: llmMessages });
        const rawContent: string = (typeof response.choices?.[0]?.message?.content === 'string'
          ? response.choices[0].message.content
          : "I'm sorry, I had a little trouble there. Could you say that again?");

        // Check for lead capture marker
        let displayContent = rawContent;
        let leadData: Record<string, string> | null = null;

        const leadMatch = rawContent.match(/\[LEAD_CAPTURED\]([\s\S]*?\})/m);
        if (leadMatch) {
          displayContent = rawContent.replace(/\[LEAD_CAPTURED\][\s\S]*?\}/m, "").trim();
          try {
            leadData = JSON.parse(leadMatch[1]);
            // Notify owner of new lead
            await notifyOwner({
              title: `🎯 New Lead from Janice — ${leadData?.service ?? "Unknown Service"}`,
              content: `Name: ${leadData?.name ?? "Unknown"}\nContact: ${leadData?.contact ?? "Unknown"}\nService Interest: ${leadData?.service ?? "Unknown"}\nNDIS Plan: ${leadData?.ndis_plan ?? "Unknown"}\n\nPlease follow up as soon as possible.`,
            });
          } catch {
            leadData = null;
          }
        }

        return {
          content: displayContent,
          leadCaptured: leadData !== null,
          leadData,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
