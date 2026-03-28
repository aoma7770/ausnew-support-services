/*
 * AUSnew Support Services — Floating CTA Component
 * Design: Empowered Living — persistent bottom-right CTA button
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { MessageCircle, Phone, X } from "lucide-react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
      role="complementary"
      aria-label="Quick contact options"
    >
      {/* Expanded options */}
      {expanded && (
        <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-4 duration-200">
          <a
            href="tel:0291594976"
            className="flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
            style={{ background: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}
            aria-label="Call AUSnew Support Services"
          >
            <Phone className="w-4 h-4" />
            Call (02) 9159 4976
          </a>
          <a
            href="/#enquiry-form"
            className="flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
            style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}
            onClick={() => setExpanded(false)}
          >
            <MessageCircle className="w-4 h-4" />
            Send an Enquiry
          </a>
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
        style={{
          background: expanded ? '#1B3A5C' : '#FF6B6B',
          boxShadow: '0 8px 30px rgba(255, 107, 107, 0.4)',
        }}
        aria-label={expanded ? "Close contact options" : "Open contact options"}
        aria-expanded={expanded}
      >
        {expanded ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
