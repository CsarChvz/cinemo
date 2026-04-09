// middleware.ts
import { auth } from '@/app/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // 1. Lógica de expiración manual o limpieza
  // Si intentas entrar a una ruta protegida y no hay sesión,
  // nos aseguramos de limpiar cualquier rastro de cookies viejas
  if (
    !isLoggedIn &&
    (nextUrl.pathname.startsWith('/admin') ||
      nextUrl.pathname.startsWith('/dashboard'))
  ) {
    const response = NextResponse.redirect(new URL('/login', nextUrl));

    // Borramos la cookie de NextAuth (ajusta el nombre si la cambiaste en la config)
    response.cookies.delete('authjs.session-token');
    // Si usas una cookie propia para el token de Java:
    response.cookies.delete('access_token');

    return response;
  }

  // --- Tu lógica de roles actual ---
  const userRole = req.auth?.user?.role;
  if (nextUrl.pathname.startsWith('/admin')) {
    if (userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
  }

  return NextResponse.next();
});
