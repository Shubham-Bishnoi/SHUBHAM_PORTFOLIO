import { Navigate, Route, Routes } from 'react-router-dom'

import { AboutPage } from '@/pages/About/AboutPage'
import { ContactPage } from '@/pages/Contact/ContactPage'
import { ExperiencePage } from '@/pages/Experience/ExperiencePage'
import { ProjectsPage } from '@/pages/Projects/ProjectsPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/about" replace />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/experience" element={<ExperiencePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/about" replace />} />
    </Routes>
  )
}
