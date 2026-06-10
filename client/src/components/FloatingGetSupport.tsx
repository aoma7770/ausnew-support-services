/*
 * AUSnew Support Services — Floating "Get Support Now" Button
 * Context-aware: links to the correct Wufoo form / enquiry section based on current page.
 * Appears after scrolling 300px, slides in from the left side of the screen.
 */
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { trackFloatingCTAClick } from "@/lib/pixel";

// Map each route to the correct form destination
// Using hash anchors (#enquiry-form) scrolls to the embedded Wufoo form on that page
const PAGE_FORM_MAP: Record<string, { href: string; label: string }> = {
  "/accommodation-services": { href: "/accommodation-services#enquiry-form", label: "Enquire About Accommodation" },
  "/community-access":       { href: "/community-access#enquiry-form",       label: "Enquire About Community Access" },
  "/day-programs":           { href: "/day-programs#enquiry-form",            label: "Enquire About Day Programs" },
  "/assistance-daily-life":  { href: "/contact",                              label: "Get Support Now" },
  "/ndis-pricing":           { href: "/contact",                              label: "Get Support Now" },
  "/about":                  { href: "/contact",                              label: "Get Support Now" },
  "/blog":                   { href: "/contact",                              label: "Get Support Now" },
};

const DEFAULT_FORM = { href: "/contact", label: "Get Support Now" };

export default function FloatingGetSupport() {
  const [visible, setVisible] = useState(false);
  const [location] = useLocation();

  // Resolve the correct destination for the current page
  // Also match blog post sub-routes
  const isBlogPost = location.startsWith("/blog/");
  const destination = isBlogPost
    ? { href: "/contact", label: "Get Support Now" }
    : (PAGE_FORM_MAP[location] ?? DEFAULT_FORM);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    trackFloatingCTAClick();
    // If the destination is a hash anchor on the same page, smooth scroll
    if (destination.href.includes("#")) {
      const anchor = destination.href.split("#")[1];
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    // Otherwise navigate normally
    window.location.href = destination.href;
  };

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
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-5 py-3 text-white font-bold text-sm rounded-r-full shadow-2xl transition-all hover:scale-105 active:scale-95 group"
        style={{
          background: "linear-gradient(135deg, #FF6B6B 0%, #e85555 100%)",
          boxShadow: "0 6px 24px rgba(255,107,107,0.45)",
          fontFamily: "Poppins, sans-serif",
          letterSpacing: "0.01em",
        }}
        aria-label={`${destination.label} — AUSnew Support Services`}
      >
        {destination.label}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}
