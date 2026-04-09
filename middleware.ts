// ═══════════════════════════════════════════════════════════════════════════════
// FILE: middleware.ts  — Protects /admin/* routes and /api/admin/* endpoints
// ═══════════════════════════════════════════════════════════════════════════════
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === 'admin';
    const isAdminRoute =
      req.nextUrl.pathname.startsWith('/admin') ||
      req.nextUrl.pathname.startsWith('/api/admin');

    if (isAdminRoute && !isAdmin) {
      // Redirect admin page visits to home; 403 for API calls
      if (req.nextUrl.pathname.startsWith('/api/')) {
        return new NextResponse(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Only run middleware if user is logged in; redirect to sign-in otherwise
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        // These routes require login
        const protectedRoutes = ['/orders', '/checkout', '/admin'];
        const needsAuth = protectedRoutes.some((p) => pathname.startsWith(p));
        if (needsAuth) return !!token;
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/orders/:path*', '/checkout/:path*'],
};
