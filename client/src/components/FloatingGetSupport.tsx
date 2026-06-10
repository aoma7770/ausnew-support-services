/*
 * AUSnew Support Services — Floating "Get Support Now" Button
 * Appears after scrolling 300px, slides in from the left side of the screen.
 * Links to the Contact page enquiry form.
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { trackFloatingCTAClick } from "@/lib/pixel";

export default function FloatingGetSupport() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check immediately in case page is already scrolled
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-8 left-0 z-40 transition-all duration-500"
      style={{
        transform: visible ? "translateX(0)" : "translateX(-110%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-hidden={!visible}
    >
      <Link href="/contact">
        <button
          onClick={trackFloatingCTAClick}
          className="flex items-center gap-2 px-5 py-3 text-white font-bold text-sm rounded-r-full shadow-2xl transition-all hover:scale-105 active:scale-95 hover:shadow-red-400/40 group"
          style={{
            background: "linear-gradient(135deg, #FF6B6B 0%, #e85555 100%)",
            boxShadow: "0 6px 24px rgba(255,107,107,0.45)",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "0.01em",
          }}
          aria-label="Get Support Now — contact AUSnew Support Services"
        >
          Get Support Now
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </Link>
    </div>
  );
}
