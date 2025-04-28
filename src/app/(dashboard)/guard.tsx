// components/AuthGuard.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const isAuthenticated = await checkSession() // Your session check logic
      if (!isAuthenticated) {
        router.push(`/login?from=${window.location.pathname}`)
      }
    }

    checkAuth()
  }, [router])

  return <>{children}</>
}