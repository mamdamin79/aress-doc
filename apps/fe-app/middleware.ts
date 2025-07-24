import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define routes that require authentication
const protectedRoutes = [
  '/',
  '/reports',
  '/report', // covers /report/:id
  '/profile',
  '/investment_funds',
  '/render',
];

// Define routes that should be hidden from logged-in users (e.g., login/register)
const authPages = ['/login', '/forgot'];

function isProtectedRoute(pathname: string) {
  if (pathname === '/') return true; // Only protect home if exactly "/"
  return protectedRoutes.some(
    (route) => route !== '/' && pathname.startsWith(route),
  );
}

function isAuthPage(pathname: string) {
  return authPages.some((route) => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token')?.value;

  // If user is not logged in and tries to access a protected page, redirect to login
  if (isProtectedRoute(pathname) && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in and tries to access login/register, redirect to home/dashboard
  if (isAuthPage(pathname) && token) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  // Otherwise, allow
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
