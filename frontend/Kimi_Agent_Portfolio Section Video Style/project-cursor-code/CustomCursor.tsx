"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface CustomCursorProps {
  cursorSize?: number;
  cursorColor?: string;
  arrowColor?: string;
  hoverScale?: number;
}

export default function CustomCursor({
  cursorSize = 100,
  cursorColor = "rgba(255, 255, 255, 0.9)",
  arrowColor = "#000",
  hoverScale = 1.3,
}: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();

  useEffect(() => {
    // Check if device is touch-based (disable custom cursor on mobile/tablet)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Smooth cursor animation using requestAnimationFrame
    const animateCursor = () => {
      const ease = 0.15; // Lower = smoother/slower follow
      
      cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * ease;
      cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPosition.current.x - cursorSize / 2}px, ${cursorPosition.current.y - cursorSize / 2}px) scale(${isHovering ? hoverScale : 1})`;
      }

      rafId.current = requestAnimationFrame(animateCursor);
    };

    // Add hover detection for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor-hover], .project-card, .cursor-pointer'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", () => setIsHovering(true));
          el.removeEventListener("mouseleave", () => setIsHovering(false));
        });
      };
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    rafId.current = requestAnimationFrame(animateCursor);
    
    // Initial hover listener setup
    const cleanupHover = addHoverListeners();

    // Re-attach listeners when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      cleanupHover();
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      observer.disconnect();
      cleanupHover();
      document.body.style.cursor = "auto";
    };
  }, [cursorSize, hoverScale, isHovering, isVisible]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        width: cursorSize,
        height: cursorSize,
      }}
    >
      <div
        className="w-full h-full rounded-full border-2 flex items-center justify-center transition-transform duration-300"
        style={{
          borderColor: cursorColor,
          backgroundColor: isHovering ? cursorColor : "transparent",
        }}
      >
        <ArrowUpRight
          size={cursorSize * 0.35}
          style={{ color: isHovering ? arrowColor : cursorColor }}
          strokeWidth={2}
        />
      </div>
    </div>
  );
}
