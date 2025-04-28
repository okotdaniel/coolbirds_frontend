import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const API_URL = 'localhost:8000/api/v1'

export async function middleware(request: NextRequest) {
  // 1. Skip preflight requests and static files
  if (request.method === 'OPTIONS' || 
      request.nextUrl.pathname.startsWith('/_next') ||
      request.nextUrl.pathname.includes('.')) {
    return NextResponse.next()
  }

  // 2. Define routes
  const publicRoutes = ['/login', '/register', '/']
  const protectedRoutes = ['/dashboard', '/profile', '/settings']

  // 3. Check route protection status
  const isProtected = protectedRoutes.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  const token_body = {
    'token': request.cookies.get('access')?.value
  }

  // 4. Handle protected routes
  if (isProtected) {
    // try {
    //   const verifyResponse = await fetch('http://127.0.0.1:8000/api/v1/accounts/verify/', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(token_body)
    //   })
    //   if (!verifyResponse.ok) {
    //     const loginUrl = new URL('/login', request.url)
    //     // loginUrl.searchParams.set('from', request.nextUrl.pathname)
    //     return NextResponse.redirect(loginUrl)
    //   }
    // } catch (error) {
    //   console.error('Auth verification failed:', error)
    //   // return NextResponse.redirect(new URL('/login?error=auth_failed', request.url))
    // }
  }

  // 5. Prevent authenticated users from accessing auth routes
  const isAuthRoute = publicRoutes.includes(request.nextUrl.pathname)
  if (isAuthRoute) {
    // const verifyResponse = await fetch('http://127.0.0.1:8000/api/v1/accounts/verify/', {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(token_body)

    // })

    // if (verifyResponse.ok) {
    //   return NextResponse.redirect(new URL('/dashboard', request.url))
    // }
  }

  return NextResponse.next()
}

// Apply to specific paths only
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/login',
    '/register'
  ]
}



