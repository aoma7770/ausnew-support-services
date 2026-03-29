/*
 * AUSnew Support Services — Janice AI Chatbot
 * Design: Empowered Living — persistent bottom-right AI chat assistant named Janice
 * Janice is AUSnew's virtual NDIS support assistant
 */
import { useState, useEffect, useRef } from "react";
import { X, Send, Phone, MessageCircle } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/logo_transparent_0f69aa9a.webp";

type Message = {
  from: "janice" | "user";
  text: string;
  time: string;
};

const JANICE_RESPONSES: Record<string, string> = {
  default: "Thanks for your message! I'm Janice, AUSnew's virtual support assistant. I can help with questions about our NDIS services, accommodation, pricing, and more. Or would you like me to connect you with our team directly?",
  hello: "Hi there! 👋 I'm Janice, AUSnew's virtual NDIS support assistant. How can I help you today? You can ask me about our services, NDIS funding, accommodation options, or how to get started.",
  hi: "Hi there! 👋 I'm Janice, AUSnew's virtual NDIS support assistant. How can I help you today? You can ask me about our services, NDIS funding, accommodation options, or how to get started.",
  hey: "Hey! 👋 I'm Janice from AUSnew Support Services. What can I help you with today?",
  services: "AUSnew provides four main NDIS support services:\n\n• **Accommodation Services** — SDA, SIL, STA/Respite, and MTA housing\n• **Community Access** — Social activities, transport, and community participation\n• **Assistance with Daily Life** — Personal care, household tasks, and daily routines\n• **Day Programs** — Structured activities, skills development, and social engagement\n\nWhich service would you like to know more about?",
  accommodation: "AUSnew offers a range of NDIS-funded accommodation options:\n\n• **SDA** — Specialist Disability Accommodation (purpose-built accessible homes)\n• **SIL** — Supported Independent Living (24/7 support in shared or solo homes)\n• **STA/Respite** — Short-term accommodation for planned breaks\n• **MTA** — Medium Term Accommodation (up to 90 days transitional housing)\n\nAll pricing is individually assessed by the NDIA. Would you like to enquire about a specific option?",
  sda: "SDA (Specialist Disability Accommodation) is purpose-built housing for NDIS participants with extreme functional impairment or very high support needs.\n\nAUSnew has SDA properties across NSW and VIC. SDA funding is individually assessed and set by the NDIA based on your design category and location.\n\nWould you like to submit an accommodation enquiry? I can direct you to our form.",
  sil: "SIL (Supported Independent Living) provides 24/7 support for participants living in shared or individual homes. AUSnew's SIL services are tailored to each participant's goals and support needs.\n\nSIL funding is individually quoted. Would you like our team to contact you with more information?",
  pricing: "AUSnew follows the NDIS Pricing Arrangements 2025-26. Key rates include:\n\n• **Daily Life / Community Access** — from $70.23/hr (weekday)\n• **MTA** — up to $725.24/day\n• **SDA, SIL, STA, Respite** — individually assessed & quoted by NDIA\n\nVisit our NDIS Pricing page for the full breakdown, or call us on (02) 9159 4976 for a personalised quote.",
  ndis: "The NDIS (National Disability Insurance Scheme) funds supports for Australians with permanent and significant disability.\n\nAUSnew Support Services is a registered NDIS provider. We can help you understand your NDIS plan, access the right supports, and connect you with the services you need.\n\nWould you like to know how to get started with AUSnew?",
  contact: "You can reach AUSnew Support Services:\n\n📞 **Phone:** (02) 9159 4976\n📧 **Email:** info@ausnewsupports.com.au\n\nOr fill in our online enquiry form and our team will call you back to discuss your support options.",
  phone: "You can call us directly on **(02) 9159 4976** during business hours, or tap the button below to call now!",
  email: "You can email us at **info@ausnewsupports.com.au** and our team will get back to you promptly.",
  community: "Our Community Access service supports NDIS participants to engage with their community, pursue hobbies, attend social events, and build independence.\n\nWe provide transport, one-on-one support, and group activities. Rates start from $70.23/hr on weekdays.\n\nWould you like to enquire about Community Access support?",
  "day program": "AUSnew's Day Programs offer structured activities, skills development, and social engagement for NDIS participants.\n\nPrograms include arts and crafts, cooking, fitness, music, life skills, and community outings.\n\nWould you like to know more or submit an enquiry?",
  respite: "Respite (Short Term Accommodation / STA) gives participants and their carers a planned break. AUSnew provides STA in comfortable, accessible homes.\n\nRespite pricing is individually assessed and quoted by the NDIA based on your support needs. Contact us for a personalised quote.",
  enquiry: "I'd love to help you get started! You can:\n\n1. **Fill in our online form** — scroll to the enquiry form on our homepage\n2. **Call us** — (02) 9159 4976\n3. **Email us** — info@ausnewsupports.com.au\n\nOur team will contact you to discuss your NDIS support options.",
  form: "You can submit an enquiry directly on our website. Scroll to the bottom of the homepage and fill in the form — our team will call you back to discuss your NDIS support options.",
  thanks: "You're very welcome! 😊 Is there anything else I can help you with? Don't hesitate to ask.",
  "thank you": "You're very welcome! 😊 Is there anything else I can help you with?",
  bye: "Goodbye! 👋 Don't hesitate to reach out if you need anything. AUSnew Support Services is here to help.",
  goodbye: "Goodbye! 👋 Take care, and feel free to come back anytime if you have more questions.",
};

function getJaniceReply(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const key of Object.keys(JANICE_RESPONSES)) {
    if (lower.includes(key)) return JANICE_RESPONSES[key];
  }
  return JANICE_RESPONSES.default;
}

function formatTime() {
  return new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });
}

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "janice",
      text: "Hi! 👋 I'm **Janice**, AUSnew's virtual NDIS support assistant. How can I help you today?\n\nYou can ask me about our services, accommodation, pricing, or how to get started with NDIS support.",
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { from: "user", text: trimmed, time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getJaniceReply(trimmed);
      setMessages((prev) => [...prev, { from: "janice", text: reply, time: formatTime() }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderText = (text: string) => {
    // Bold **text** and newlines
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Window */}
      {open && (
        <div
          className="w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{
            background: "white",
            border: "1px solid rgba(27,58,92,0.12)",
            maxHeight: "520px",
            animation: "slideUpFade 0.25s ease",
          }}
          role="dialog"
          aria-label="Chat with Janice, AUSnew's virtual assistant"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: "linear-gradient(135deg, #1B3A5C 0%, #0d2440 100%)" }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                  style={{ background: "rgba(43,191,207,0.2)", border: "2px solid #2BBFCF" }}
                >
                  <img src={LOGO_URL} alt="Janice" className="w-8 h-8 object-contain" />
                </div>
                <span
                  className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                  style={{ background: "#22c55e" }}
                />
              </div>
              <div>
                <div className="text-sm font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Janice
                </div>
                <div className="text-xs" style={{ color: "#2BBFCF", fontFamily: "Inter, sans-serif" }}>
                  AUSnew Virtual Assistant · Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="tel:0291594976"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
                style={{ color: "#2BBFCF" }}
                aria-label="Call AUSnew"
                title="Call us"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ background: "#f8fafc", maxHeight: "340px" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {msg.from === "janice" && (
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden mt-1"
                    style={{ background: "rgba(43,191,207,0.15)", border: "1px solid #2BBFCF" }}
                  >
                    <img src={LOGO_URL} alt="Janice" className="w-5 h-5 object-contain" />
                  </div>
                )}
                <div className={`max-w-[78%] ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div
                    className="px-3 py-2 rounded-2xl text-sm leading-relaxed"
                    style={{
                      background: msg.from === "janice" ? "white" : "#2BBFCF",
                      color: msg.from === "janice" ? "#1e293b" : "white",
                      fontFamily: "Inter, sans-serif",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                      borderTopLeftRadius: msg.from === "janice" ? "4px" : "16px",
                      borderTopRightRadius: msg.from === "user" ? "4px" : "16px",
                    }}
                  >
                    {renderText(msg.text)}
                  </div>
                  <span className="text-xs" style={{ color: "#94a3b8", fontFamily: "Inter, sans-serif" }}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2 items-center">
                <div
                  className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden"
                  style={{ background: "rgba(43,191,207,0.15)", border: "1px solid #2BBFCF" }}
                >
                  <img src={LOGO_URL} alt="Janice" className="w-5 h-5 object-contain" />
                </div>
                <div
                  className="px-3 py-2 rounded-2xl flex items-center gap-1"
                  style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: "#2BBFCF",
                        animation: `bounce 1.2s infinite ${d * 0.2}s`,
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
            {["Services", "Accommodation", "Pricing", "Contact"].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  setTimeout(() => {
                    const userMsg: Message = { from: "user", text: q, time: formatTime() };
                    setMessages((prev) => [...prev, userMsg]);
                    setInput("");
                    setTyping(true);
                    setTimeout(() => {
                      const reply = getJaniceReply(q);
                      setMessages((prev) => [...prev, { from: "janice", text: reply, time: formatTime() }]);
                      setTyping(false);
                    }, 800);
                  }, 0);
                }}
                className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105"
                style={{
                  background: "rgba(43,191,207,0.1)",
                  color: "#1B3A5C",
                  border: "1px solid rgba(43,191,207,0.3)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            className="px-4 py-3 flex items-center gap-2"
            style={{ background: "white", borderTop: "1px solid #e2e8f0" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Janice anything..."
              className="flex-1 text-sm outline-none px-3 py-2 rounded-full"
              style={{
                background: "#f1f5f9",
                color: "#1e293b",
                fontFamily: "Inter, sans-serif",
                border: "1px solid #e2e8f0",
              }}
              aria-label="Type your message to Janice"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "#2BBFCF" }}
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 active:scale-95 relative"
        style={{
          background: open ? "#1B3A5C" : "#2BBFCF",
          boxShadow: open
            ? "0 8px 30px rgba(27,58,92,0.5)"
            : "0 8px 30px rgba(43,191,207,0.5)",
        }}
        aria-label={open ? "Close Janice chat" : "Chat with Janice, AUSnew's virtual assistant"}
        aria-expanded={open}
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "#FF6B6B", fontFamily: "Poppins, sans-serif" }}
            >
              1
            </span>
          </>
        )}
      </button>

      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
