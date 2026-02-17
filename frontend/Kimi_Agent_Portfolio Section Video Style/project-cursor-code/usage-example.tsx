// Example: How to integrate the Custom Cursor and Project Showcase
// Add this to your main layout or page file

"use client";

import CustomCursor from "./CustomCursor";
import ProjectShowcase from "./ProjectShowcase";

// Your project data - replace with your actual projects
const projects = [
  {
    id: "predictive-audit",
    title: "Predictive Audit Risk Scoring Platform",
    category: "Audit Analytics",
    year: "2025",
    image: "/images/projects/audit-risk.jpg", // Replace with your image paths
    description: "ML-based audit fraud-risk scoring with SHAP explainability",
    link: "/projects/predictive-audit",
  },
  {
    id: "biodiversity-ai",
    title: "AI-Driven Biodiversity & Natural Capital Evaluation",
    category: "ESG / Geospatial AI",
    year: "2025",
    image: "/images/projects/biodiversity.jpg",
    description: "Geospatial AI platform for environmental monitoring",
    link: "/projects/biodiversity-ai",
  },
  {
    id: "multi-agent-rl",
    title: "Multi-Agent RL for Dynamic Contract Bidding & Negotiation",
    category: "Reinforcement Learning",
    year: "2025",
    image: "/images/projects/multi-agent.jpg",
    description: "DeepRL bidding simulator with LLM-driven negotiation",
    link: "/projects/multi-agent-rl",
  },
  {
    id: "anomaly-detection",
    title: "Automated Anomaly Detection & Fraud Risk Scoring System",
    category: "Fraud Detection",
    year: "2025",
    image: "/images/projects/anomaly.jpg",
    description: "Real-time fraud detection with Kafka streaming",
    link: "/projects/anomaly-detection",
  },
  {
    id: "resume-screener",
    title: "AI-Powered Resume Screener & Intelligent Recruitment Platform",
    category: "HR Tech",
    year: "2025",
    image: "/images/projects/resume.jpg",
    description: "Resume parsing with embeddings and match scoring",
    link: "/projects/resume-screener",
  },
  {
    id: "financial-reporting",
    title: "AI-Powered Financial Reporting & Autonomous FP&A",
    category: "Finance AI",
    year: "2025",
    image: "/images/projects/finance.jpg",
    description: "Autonomous FP&A system with CFO-ready reports",
    link: "/projects/financial-reporting",
  },
  {
    id: "ai-workstation",
    title: "High-Performance AI Workstation Setup (Enterprise)",
    category: "AI Infrastructure",
    year: "2025",
    image: "/images/projects/workstation.jpg",
    description: "Automated GPU workstation provisioning",
    link: "/projects/ai-workstation",
  },
  {
    id: "llm-pipeline",
    title: "Enterprise LLM Model Engineering & Fine-Tuning Pipeline",
    category: "LLM Engineering",
    year: "2025",
    image: "/images/projects/llm.jpg",
    description: "End-to-end enterprise LLM factory",
    link: "/projects/llm-pipeline",
  },
];

export default function ProjectsPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Custom Cursor - Add this at the top level of your page */}
      <CustomCursor
        cursorSize={100}        // Size of the cursor circle in pixels
        cursorColor="rgba(255, 255, 255, 0.9)"  // Border color
        arrowColor="#000"       // Arrow icon color on hover
        hoverScale={1.3}        // Scale when hovering interactive elements
      />

      {/* Project Showcase Section */}
      <ProjectShowcase
        projects={projects}
        title="Work we're proud of"
        subtitle="Over the years I completed hundreds of projects with several clients. Here is a selection of the best ones."
      />
    </main>
  );
}
