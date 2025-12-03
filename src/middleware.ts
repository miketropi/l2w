import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('payload-token')?.value
  const userRoutes = ['/dashboard']
  const isUserRoute = userRoutes.some(path => pathname.startsWith(path))

  const res = await fetch(new URL('/api/users/me', req.url), {
    method: 'GET',
    headers: {
      'Cookie': `payload-token=${token}`,
    }, 
  })
  
  if (!res.ok) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const user = await res.json()

  if (!user.user) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isUserRoute) {
    const hasRole = user.user.roles?.some((role: string) =>
      ['admin', 'editor', 'user'].includes(role)
    )
    if (!hasRole) {
      return NextResponse.redirect(new URL('/not-authorized', req.url))
    }
  }

  return NextResponse.next()
}

// 7️⃣ Áp dụng middleware cho các route cần bảo vệ
export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
}
