# Solo Implementation Prompt for Navbar & Footer

## Overview
Implement a custom navbar with inverted cursor effect and a dramatic footer for a portfolio website. Both components use a **white theme** (not dark).

---

## Prerequisites

```bash
# Install required dependencies
npm install framer-motion lucide-react
```

---

## 1. NAVBAR COMPONENT

### Features Required:
- **White background** with subtle bottom border
- **Name/logo** on the left: "SHUBHAM"
- **Navigation links** in the center: ABOUT, EXPERIENCE, PROJECTS, BLOG, CONTACT
- **Year marker** on the right: "®2026"
- **Custom cursor effect**: White circle that follows mouse and inverts text color on hover (mix-blend-difference)
- Smooth scroll to sections on click

### File: `src/sections/Navbar.tsx`

```tsx
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
        <motion.span
          className="relative z-10 text-sm font-medium text-black"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          ®2026
        </motion.span>
      </div>

      {/* Bottom border line */}
      <div className="h-px w-full bg-gray-200" />
    </nav>
  );
}
```

---

## 2. FOOTER COMPONENT

### Features Required:
- **White background** with optional background image overlay
- **Large typography** displaying name: "Shubham ©2026 BISHNOI" (very large, semi-transparent)
- **Navigation links** on the left: PROJECTS, ABOUT, EXPERIENCE, CONTACT
- **Social links** on the right: LINKEDIN, GITHUB, TWITTER (with arrow icons)
- **Copyright info**: "© 2026 Shubham Bishnoi | Bangalore, India"
- **Back to Top button** with hover animation
- Parallax scroll effect on background image
- Fade-in animations on scroll

### File: `src/sections/Footer.tsx`

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface SocialLink {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "PROJECTS", href: "#projects" },
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

const socialLinks: SocialLink[] = [
  { label: "LINKEDIN", href: "https://linkedin.com/in/shubham" },
  { label: "GITHUB", href: "https://github.com/shubham" },
  { label: "TWITTER", href: "https://twitter.com/shubham" },
];

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={containerRef}
      className="relative min-h-[80vh] w-full overflow-hidden bg-white"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 h-[120%] w-full">
          {/* Replace with your own background image */}
          <img
            src="/your-background-image.jpg"
            alt="Background"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>
      </motion.div>

      {/* Large Typography Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-[12vw] font-light leading-none tracking-tighter text-black/10">
            Shubham
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="text-[8vw] font-light text-black/10">©2026</span>
            <span className="text-[12vw] font-light leading-none tracking-tighter text-black/10">
              BISHNOI
            </span>
          </div>
        </motion.div>
      </div>

      {/* Footer Content */}
      <div className="relative z-20 flex min-h-[80vh] flex-col justify-between px-6 py-12 lg:px-16">
        {/* Top Section - Navigation & Social */}
        <div className="flex flex-col justify-between gap-8 pt-20 lg:flex-row">
          {/* Left - Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-6"
          >
            {navLinks.map((link) => (
              <motion.button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="group flex items-center gap-1 text-sm font-medium tracking-wider text-black"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.button>
            ))}
          </motion.div>

          {/* Right - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-2 lg:items-end"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 text-sm font-medium tracking-wider text-black"
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.a>
            ))}
            <p className="mt-4 text-sm text-gray-500">
              Designed with passion
            </p>
          </motion.div>
        </div>

        {/* Bottom Section - Copyright & Back to Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-6 border-t border-gray-200 pt-8 lg:flex-row"
        >
          <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-8">
            <span className="text-sm text-gray-600">
              © 2026 Shubham Bishnoi
            </span>
            <span className="hidden text-gray-300 lg:inline">|</span>
            <span className="text-sm text-gray-600">Bangalore, India</span>
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-black transition-all hover:bg-black hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Top
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
```

---

## 3. INTEGRATION IN App.tsx

```tsx
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Your page sections with corresponding IDs */}
        <section id="about">...</section>
        <section id="experience">...</section>
        <section id="projects">...</section>
        <section id="blog">...</section>
        <section id="contact">...</section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
```

---

## Customization Guide

### Navbar:
- Change `navItems` array to update navigation links
- Change "SHUBHAM" text to your name
- Change "®2026" to your preferred year marker
- Adjust cursor size by changing `60` in the animate prop

### Footer:
- Replace `/your-background-image.jpg` with your actual image path
- Update `navLinks` and `socialLinks` arrays
- Change large typography text ("Shubham", "©2026", "BISHNOI")
- Update copyright text and location
- Adjust opacity of background image (currently `opacity-30`)

---

## Key Design Decisions

1. **White Theme**: Both components use `bg-white` and `text-black` for a clean, minimal look
2. **Custom Cursor**: Uses `mix-blend-difference` to invert colors when hovering over text
3. **Smooth Animations**: All animations use Framer Motion with spring physics
4. **Scroll Behavior**: Smooth scroll to sections when clicking nav links
5. **Responsive**: Components adapt to mobile screens
