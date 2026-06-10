/**
 * useScrollDepthTracking — fires Meta Pixel ScrollDepth events at 25/50/75/90%
 * Call this hook once per page component.
 */
import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { trackScrollDepth } from "@/lib/pixel";

const MILESTONES = [25, 50, 75, 90];

export function useScrollDepthTracking() {
  const [location] = useLocation();
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Reset fired milestones on route change
    firedRef.current = new Set();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of MILESTONES) {
        if (pct >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone);
          trackScrollDepth(location, milestone);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);
}
