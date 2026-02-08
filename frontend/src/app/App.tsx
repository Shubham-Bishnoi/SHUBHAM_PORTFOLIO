import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from '@/app/routes'
import { BackToTop } from '@/components/Layout/BackToTop'
import { Footer } from '@/components/Layout/Footer'
import { HeaderNav } from '@/components/Layout/HeaderNav'

export default function App() {
  return (
    <BrowserRouter>
      <HeaderNav />
      <AppRoutes />
      <Footer />
      <BackToTop />
    </BrowserRouter>
  )
}

