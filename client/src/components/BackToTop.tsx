import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Show button after scrolling 400px
      setVisible(scrollY > 400);

      // Detect when user is within 60px of the bottom
      setAtBottom(scrollY + windowHeight >= docHeight - 60);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Keyframe bounce animation injected once */}
      <style>{`
        @keyframes btt-bounce {
          0%, 100% { transform: translateY(0); }
          25%       { transform: translateY(-8px); }
          50%       { transform: translateY(-4px); }
          75%       { transform: translateY(-10px); }
        }
        .btt-bounce {
          animation: btt-bounce 0.7s ease-in-out 2;
        }
      `}</style>

      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        key={atBottom ? "bounce" : "still"}
        className={`fixed bottom-24 right-5 z-50 flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2BBFCF] ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        } ${atBottom ? "btt-bounce" : ""}`}
        style={{ backgroundColor: "#1B3A5C" }}
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>
    </>
  );
}
