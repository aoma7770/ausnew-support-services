import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  insertJaniceLead,
  insertLead,
  getAllLeads,
  updateJaniceZapierDelivery,
} from "./db";
import { deliverJaniceLeadToZapier } from "./janiceLeadWebhook";
import { z } from "zod";

// ─── Janice System Prompt ────────────────────────────────────────────────────
const JANICE_SYSTEM_PROMPT = `You are Janice, a warm, empathetic and professional virtual assistant for AUSnew Support Services — a registered NDIS provider in Australia. You speak naturally, like a knowledgeable and caring person, not a robot or a form.

YOUR CORE MISSION:
Your primary job is to understand a visitor's support needs, qualify genuine enquiries, and collect enough information for the AUSnew team to make a helpful follow-up call. You are NOT a general NDIS information service. Be helpful and warm, but gently guide each relevant conversation toward a clear handover.

NATURAL CONVERSATION STYLE:
- Sound human, relaxed and respectful. Use contractions and respond to what the person has actually said.
- Keep each response concise: usually one short acknowledgement plus one question. Never interrogate someone with a long form-like list.
- Ask one question at a time, prioritising the most important missing detail.
- Briefly reflect what you understand before moving to the next question, especially when the situation is complex.
- If the visitor does not know an answer, accept that gracefully. Never pressure them to share sensitive information.
- If a visitor declines an optional detail, move on. The phone number is the only contact field required before handover.

LEAD INTAKE — COLLECT THESE NATURALLY:
Collect the details that are relevant and available, in this priority order:
1. First name (or preferred name).
2. What support they are looking for and the reason for the enquiry. Capture useful detail, not just a service label.
3. Their best PHONE NUMBER. This is mandatory before you hand the lead over. Do not substitute an email address for a phone number.
4. When support is needed or when they would like to start.
5. Expected duration or whether the support is ongoing, short term, respite, transitional, etc.
6. General preferred area/suburb/region only if relevant. Never ask for a property address.
7. Whether the person has an active NDIS plan, if they are comfortable sharing it.
8. Whether the enquirer is the participant, a family member/carer, support coordinator, or another representative.
9. Best time for the team to call, if they have a preference.
10. Email address only if they are happy to provide it. Email is optional and should never delay a handover once a valid phone number is supplied.

SERVICES AUSNEW OFFERS:
- Accommodation Services: SDA (Specialist Disability Accommodation), SIL (Supported Independent Living), STA/Respite, MTA (Medium Term Accommodation)
- Community Access: Social activities, transport and community participation
- Assistance with Daily Life: Personal care, household tasks, daily routines and meal preparation
- Day Programs: Structured activities, skills development, social engagement, arts, cooking and fitness

IMPORTANT BOUNDARIES:
- Never give specific property addresses, availability guarantees or pricing quotes. Say the team can check the current options.
- Never mention competitor providers.
- Do not give legal, medical or NDIA decision advice.
- If someone is in crisis or distress, compassionately direct them to call 000 or Lifeline on 13 11 14.
- Do not request NDIS numbers, dates of birth, diagnoses, Medicare details, payment details or any other unnecessary sensitive information.
- If asked directly, AUSnew's phone is (02) 9159 4976 and email is info@ausnewsupports.com.au.

LEAD CAPTURE RULE:
Only after you have ALL of the following: (a) a preferred name, (b) a valid phone number, (c) a service interest, and (d) a concise but useful summary of what they are looking for, tell them warmly that the team will call them. Then include this special marker as the final content of your reply; it is hidden from the visitor:
[LEAD_CAPTURED]{"name":"...","phone":"...","email":"... or null","service":"...","summary":"A clear 1–3 sentence handover summary of the person's needs, timing, duration and key context","support_details":"... or null","location":"general area/suburb/region or null","start_time":"when support is needed or null","duration":"expected duration/ongoing status or null","preferred_contact_time":"... or null","relationship":"participant/carer/support coordinator/etc. or null","ndis_plan_status":"active plan/not confirmed/etc. or null"}

Never produce [LEAD_CAPTURED] until the visitor has supplied a phone number. If the phone number is missing, thank them for the information and naturally ask: “What’s the best phone number for our team to call you on?”`;

const phoneDigits = (value: string) => value.replace(/\D/g, "");
const isValidPhone = (value: string) => phoneDigits(value).length >= 8;

const optionalText = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if (!normalized || /^(n\/?a|none|not provided|unknown|null)$/i.test(normalized)) return null;
  return normalized;
};

const serialiseTranscript = (
  messages: Array<{ role: "user" | "assistant"; content: string }>,
  finalJaniceMessage: string
) => {
  const transcript = [
    ...messages.map(message => ({
      speaker: message.role === "user" ? "Visitor" : "Janice",
      message: message.content,
    })),
    { speaker: "Janice", message: finalJaniceMessage },
  ];
  return JSON.stringify(transcript).slice(0, 60_000);
};

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
          content: `Name: ${input.name}\nPhone: ${input.phone}\nEmail: ${input.email}\nSupport Type: ${input.supportType ?? "Not specified"}\nNDIS Number: ${input.ndisNumber ?? "Not provided"}\nMessage: ${input.message ?? "None"}\nSource: ${input.sourcePage}`,
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
        sourcePage: z.string().max(256).optional(),
      }))
      .mutation(async ({ input }) => {
        const llmMessages = [
          { role: "system" as const, content: JANICE_SYSTEM_PROMPT },
          ...input.messages.map(message => ({
            role: message.role as "user" | "assistant",
            content: message.content,
          })),
        ];

        const response = await invokeLLM({ messages: llmMessages });
        const rawContent: string = typeof response.choices?.[0]?.message?.content === "string"
          ? response.choices[0].message.content
          : "I'm sorry, I had a little trouble there. Could you say that again?";

        let displayContent = rawContent;
        let leadCaptured = false;
        let zapierDeliveryStatus: "delivered" | "failed" | null = null;
        const leadMatch = rawContent.match(/\[LEAD_CAPTURED\]([\s\S]*?\})/m);

        if (leadMatch) {
          displayContent = rawContent.replace(/\[LEAD_CAPTURED\][\s\S]*?\}/m, "").trim();
          try {
            const candidate = JSON.parse(leadMatch[1]) as Record<string, unknown>;
            const name = optionalText(candidate.name);
            const phone = optionalText(candidate.phone);
            const service = optionalText(candidate.service);
            const summary = optionalText(candidate.summary);

            if (!name || !phone || !isValidPhone(phone) || !service || !summary) {
              displayContent = "Thanks for sharing that. Before I pass this to our team, what’s the best phone number for us to call you on?";
            } else {
              const savedLead = await insertJaniceLead({
                name,
                phone,
                email: optionalText(candidate.email),
                sourcePage: input.sourcePage ?? "/",
                supportType: service,
                leadSummary: summary,
                supportDetails: optionalText(candidate.support_details),
                location: optionalText(candidate.location),
                preferredStartTime: optionalText(candidate.start_time),
                expectedDuration: optionalText(candidate.duration),
                preferredContactTime: optionalText(candidate.preferred_contact_time),
                relationshipToParticipant: optionalText(candidate.relationship),
                ndisPlanStatus: optionalText(candidate.ndis_plan_status),
                conversationTranscript: serialiseTranscript(input.messages, displayContent),
              });

              const delivery = await deliverJaniceLeadToZapier(savedLead);
              await updateJaniceZapierDelivery(savedLead.id, delivery);
              zapierDeliveryStatus = delivery.status;
              leadCaptured = true;

              await notifyOwner({
                title: `🎯 New Lead from Janice — ${service}`,
                content: `Name: ${name}\nPhone: ${phone}\nEmail: ${optionalText(candidate.email) ?? "Not provided"}\nService Interest: ${service}\nSummary: ${summary}\nTiming: ${optionalText(candidate.start_time) ?? "Not confirmed"}\nDuration: ${optionalText(candidate.duration) ?? "Not confirmed"}\nArea: ${optionalText(candidate.location) ?? "Not confirmed"}\nNDIS Plan: ${optionalText(candidate.ndis_plan_status) ?? "Not confirmed"}\nZapier: ${delivery.status}`,
              }).catch(error => console.warn("[Janice] Owner notification failed", error));
            }
          } catch (error) {
            console.warn("[Janice] Unable to process lead capture", error);
            displayContent = "I’m sorry, I had trouble saving those details. Could you please share your best phone number and I’ll make sure our team can follow up?";
          }
        }

        return {
          content: displayContent,
          leadCaptured,
          zapierDeliveryStatus,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
