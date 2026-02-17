"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description?: string;
  link?: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card relative w-full cursor-pointer group"
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      data-cursor-hover
    >
      <a href={project.link || `#${project.id}`} className="block">
        {/* Image Container */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Overlay gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Floating cursor indicator (follows mouse within card) */}
          <motion.div
            className="absolute pointer-events-none z-10"
            animate={{
              x: mousePosition.x - 50,
              y: mousePosition.y - 50,
              scale: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.5,
            }}
          >
            <div className="w-[100px] h-[100px] rounded-full border-2 border-white/90 bg-white/90 flex items-center justify-center">
              <ArrowUpRight size={35} className="text-black" strokeWidth={2} />
            </div>
          </motion.div>
        </div>

        {/* Project Info */}
        <div className="py-6 px-2 flex items-start justify-between">
          <div>
            <motion.h3
              className="text-2xl md:text-3xl font-medium text-white mb-2"
              animate={{ x: isHovered ? 10 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
            <div className="flex items-center gap-3 text-sm text-neutral-400 uppercase tracking-wider">
              <span>{project.category}</span>
              <span className="w-1 h-1 rounded-full bg-neutral-500" />
              <span>{project.year}</span>
            </div>
          </div>

          {/* Arrow indicator */}
          <motion.div
            className="w-12 h-12 rounded-full border border-neutral-600 flex items-center justify-center"
            animate={{
              scale: isHovered ? 1.1 : 1,
              borderColor: isHovered ? "#fff" : "#525252",
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight
              size={20}
              className="text-white"
              strokeWidth={1.5}
            />
          </motion.div>
        </div>
      </a>
    </motion.div>
  );
}

export default function ProjectShowcase({
  projects,
  title = "Work we're proud of",
  subtitle = "Over the years I completed hundreds of projects with several clients. Here is a selection of the best ones.",
}: ProjectShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-black py-20 md:py-32"
    >
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-32">
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-neutral-400 text-sm md:text-base uppercase tracking-wider max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Projects List */}
        <div className="space-y-16 md:space-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
