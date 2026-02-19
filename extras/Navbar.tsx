"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "BLOG", href: "#blog" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  // Mouse position with smooth spring animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={containerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white"
    >
      {/* Custom Cursor - Inverted Circle Effect */}
      <motion.div
        className="pointer-events-none fixed z-[100] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isHovering ? 60 : 0,
            height: isHovering ? 60 : 0,
            opacity: isHovering ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo / Name */}
        <motion.a
          href="#"
          className="relative z-10 text-lg font-medium tracking-wide text-black"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          SHUBHAM
        </motion.a>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="relative z-10 text-sm font-medium tracking-wider text-black transition-colors"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Year / Copyright */}

      </div>

      {/* Bottom border line */}
      <div className="h-px w-full bg-gray-200" />
    </nav>
  );
}