// middleware.ts
import { auth } from '@/app/auth';
import { NextResponse } from 'next/server';

// 1. Define aquí todas las rutas ESTÁTICAS que requieren inicio de sesión
const protectedRoutes = [
  '/admin',
  '/checkout',
  '/bookings',
];

// 2. Define aquí todas las rutas DINÁMICAS que requieren inicio de sesión (Regex)
const protectedDynamicRoutes = [/^\/movie-screenings\/\d+\/seats/];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Verificamos si la ruta actual es protegida (buscando en estáticas y dinámicas)
  const isProtectedRoute =
    protectedRoutes.some((route) => nextUrl.pathname.startsWith(route)) ||
    protectedDynamicRoutes.some((regex) => regex.test(nextUrl.pathname));

  // Redirección si NO está logueado pero intenta acceder a ruta protegida
  if (!isLoggedIn && isProtectedRoute) {
    // Guardamos la URL exacta (incluyendo el ?roomId=61) para regresarlo ahí después del login
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    const response = NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
    );

    // Limpieza de cookies de seguridad
    response.cookies.delete('authjs.session-token');
    response.cookies.delete('__Secure-authjs.session-token');
    response.cookies.delete('access_token');

    return response;
  }

  // Protección por Rol para el panel de administración
  const userRole = req.auth?.user?.role;
  if (nextUrl.pathname.startsWith('/admin') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  return NextResponse.next();
});

// Evitamos que el middleware se ejecute en recursos estáticos e imágenes para no saturar el servidor
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
