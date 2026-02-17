"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

// Simplified version without external animation library dependency
// Uses native requestAnimationFrame for smooth following

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
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Use refs for smooth animation without re-renders
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();
  const hoverElements = useRef<Set<Element>>(new Set());

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    // Add custom cursor class to body
    document.body.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Animation loop with easing
    const animate = () => {
      const ease = 0.12; // Smooth follow speed (lower = smoother)
      
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * ease;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * ease;

      if (cursorRef.current) {
        const scale = isHovering ? hoverScale : 1;
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x - cursorSize / 2}px, ${cursorPos.current.y - cursorSize / 2}px, 0) scale(${scale})`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    // Setup hover detection
    const setupHoverDetection = () => {
      const selectors = 'a, button, [data-cursor-hover], .project-card, .cursor-pointer';
      const elements = document.querySelectorAll(selectors);
      
      const onEnter = () => setIsHovering(true);
      const onLeave = () => setIsHovering(false);

      elements.forEach((el) => {
        if (!hoverElements.current.has(el)) {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          hoverElements.current.add(el);
        }
      });
    };

    // Initial setup
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    rafId.current = requestAnimationFrame(animate);
    setupHoverDetection();

    // Watch for new elements
    const observer = new MutationObserver(setupHoverDetection);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      observer.disconnect();
      document.body.classList.remove("custom-cursor-active");
      
      // Cleanup hover listeners
      hoverElements.current.forEach((el) => {
        el.removeEventListener("mouseenter", () => setIsHovering(true));
        el.removeEventListener("mouseleave", () => setIsHovering(false));
      });
    };
  }, [cursorSize, hoverScale, isHovering, isVisible]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        width: cursorSize,
        height: cursorSize,
        willChange: "transform",
      }}
    >
      <div
        className="custom-cursor-inner w-full h-full rounded-full border-2 flex items-center justify-center"
        style={{
          borderColor: cursorColor,
          backgroundColor: isHovering ? cursorColor : "transparent",
          transition: "background-color 0.3s ease",
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
