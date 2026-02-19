import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from '@/app/routes'
import { BackToTop } from '@/components/Layout/BackToTop'
import { HeaderNav } from '@/components/Layout/HeaderNav'
import { ScrollToTop } from '@/components/Layout/ScrollToTop'

export default function App() {
  return (
    <BrowserRouter>
      <HeaderNav />
      <ScrollToTop />
      <AppRoutes />
      <BackToTop />
    </BrowserRouter>
  )
}
