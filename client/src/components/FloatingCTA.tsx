/*
 * AUSnew Support Services — Janice AI Chatbot (LLM-powered)
 * Janice is AUSnew's warm, human-like virtual NDIS support assistant.
 * Powered by the Forge LLM backend via tRPC.
 */
import { useState, useEffect, useRef } from "react";
import { X, Send, Phone, MessageCircle, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/logo_transparent_0f69aa9a.webp";

type Message = {
  role: "user" | "assistant";
  content: string;
  time: string;
  leadCaptured?: boolean;
};

function formatTime() {
  return new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });
}

// Render markdown-like bold and line breaks
function renderText(text: string) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
      )}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

const QUICK_REPLIES = ["Accommodation", "Community Access", "Daily Life Support", "Day Programs"];

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! 👋 I'm Janice from AUSnew Support Services. I'm here to help you find the right NDIS support. What brings you here today?",
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatMutation = trpc.janice.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content,
          time: formatTime(),
          leadCaptured: data.leadCaptured,
        },
      ]);
      if (data.leadCaptured) {
        setLeadCaptured(true);
      }
      setIsTyping(false);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I had a little trouble connecting just now. You can also reach us directly on (02) 9159 4976 or at info@ausnewsupports.com.au.",
          time: formatTime(),
        },
      ]);
      setIsTyping(false);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, open, isTyping]);

  const sendMessage = (text?: string) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = { role: "user", content: trimmed, time: formatTime() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    // Send the full conversation history to the LLM
    chatMutation.mutate({
      messages: updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* ── Chat Window ── */}
      {open && (
        <div
          className="w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{
            background: "white",
            border: "1px solid rgba(27,58,92,0.12)",
            maxHeight: "540px",
            animation: "janiceSlideUp 0.25s ease",
          }}
          role="dialog"
          aria-label="Chat with Janice, AUSnew's virtual assistant"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
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
                  AUSnew Support · Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <a
                href="tel:0291594976"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
                style={{ color: "#2BBFCF" }}
                aria-label="Call AUSnew"
                title="Call us directly"
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
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            style={{ background: "#f8fafc", minHeight: "280px", maxHeight: "360px" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {msg.role === "assistant" && (
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden mt-1"
                    style={{ background: "rgba(43,191,207,0.15)", border: "1px solid #2BBFCF" }}
                  >
                    <img src={LOGO_URL} alt="Janice" className="w-5 h-5 object-contain" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className="px-3 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={{
                      background: msg.role === "assistant" ? "white" : "#2BBFCF",
                      color: msg.role === "assistant" ? "#1e293b" : "white",
                      fontFamily: "Inter, sans-serif",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                      borderTopLeftRadius: msg.role === "assistant" ? "4px" : "16px",
                      borderTopRightRadius: msg.role === "user" ? "4px" : "16px",
                    }}
                  >
                    {renderText(msg.content)}
                  </div>
                  <span className="text-xs px-1" style={{ color: "#94a3b8", fontFamily: "Inter, sans-serif" }}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2 items-center">
                <div
                  className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden"
                  style={{ background: "rgba(43,191,207,0.15)", border: "1px solid #2BBFCF" }}
                >
                  <img src={LOGO_URL} alt="Janice" className="w-5 h-5 object-contain" />
                </div>
                <div
                  className="px-4 py-3 rounded-2xl flex items-center gap-1.5"
                  style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", borderTopLeftRadius: "4px" }}
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="w-2 h-2 rounded-full inline-block"
                      style={{
                        background: "#2BBFCF",
                        animation: `janiceBounce 1.2s infinite ${d * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Lead captured confirmation */}
            {leadCaptured && (
              <div
                className="mx-2 p-3 rounded-xl text-xs text-center"
                style={{ background: "rgba(43,191,207,0.1)", color: "#1B3A5C", border: "1px solid rgba(43,191,207,0.3)", fontFamily: "Inter, sans-serif" }}
              >
                ✅ Your details have been passed to our team. We'll be in touch soon!
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies — only show early in conversation */}
          {messages.length <= 2 && !isTyping && (
            <div
              className="px-4 py-2 flex gap-2 overflow-x-auto flex-shrink-0"
              style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}
            >
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95"
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
          )}

          {/* Input */}
          <div
            className="px-4 py-3 flex items-center gap-2 flex-shrink-0"
            style={{ background: "white", borderTop: "1px solid #e2e8f0" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              disabled={isTyping}
              className="flex-1 text-sm outline-none px-3 py-2 rounded-full disabled:opacity-60"
              style={{
                background: "#f1f5f9",
                color: "#1e293b",
                fontFamily: "Inter, sans-serif",
                border: "1px solid #e2e8f0",
              }}
              aria-label="Type your message to Janice"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              style={{ background: "#2BBFCF" }}
              aria-label="Send message"
            >
              {isTyping ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── Toggle Button ── */}
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
            {!leadCaptured && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "#FF6B6B", fontFamily: "Poppins, sans-serif" }}
              >
                1
              </span>
            )}
          </>
        )}
      </button>

      <style>{`
        @keyframes janiceSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes janiceBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
