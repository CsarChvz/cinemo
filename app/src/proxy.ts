// middleware.ts
import { auth } from '@/app/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isProtectedRoute =
    nextUrl.pathname.startsWith('/dashboard') ||
    nextUrl.pathname.startsWith('/profile');

  // 1. Permitir siempre las rutas de API de Auth
  if (isApiAuthRoute) return;

  // 2. Protección de rutas de Administrador
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', nextUrl));
    }
    if (userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', nextUrl)); // O a una página /unauthorized
    }
  }

  // 3. Protección de rutas de Usuario General
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  return;
});

// Matcher optimizado para excluir archivos estáticos y favicons
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
