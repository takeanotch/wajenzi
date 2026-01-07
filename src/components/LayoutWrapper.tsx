'use client'

import { usePathname } from 'next/navigation'
import NavBar from '@/components/NavBar'
import FooterUltraMinimal from '@/components/Footer'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  
  // Routes où on veut masquer navbar/footer
  const hideLayoutRoutes = ['/auth/login', '/auth/signup', '/forgot-password', '/reset-password']
  const shouldHideLayout = hideLayoutRoutes.some(route => pathname.startsWith(route))

  if (shouldHideLayout) {
    return <>{children}</>
  }

  return (
    <>
      <NavBar />
      <main className="bg-white  overflow-hidden"> {/* pt-16 pour compenser la navbar fixe */}
        {children}
      </main>
      <FooterUltraMinimal />
    </>
  )
}