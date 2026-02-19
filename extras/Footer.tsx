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

  // Parallax effect for background image
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
          {/* Replace this with your own background image */}
          <img
            src="/your-background-image.jpg"
            alt="Background"
            className="h-full w-full object-cover opacity-30"
          />
          {/* Gradient overlay for better text readability */}
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