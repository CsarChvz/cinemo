package com.cinemo.api.infrastructure.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

  private final JwtProvider jwtProvider;
  private final UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

    // 1. Extraer el header Authorization
    String authHeader = request.getHeader("Authorization");

    // 2. Validar que el header traiga el token con formato Bearer
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }

    // 3. Limpiar el string para quedarnos solo con el JWT
    String jwt = authHeader.substring(7);
    String username = jwtProvider.extractUsername(jwt);

    // 4. Si hay usuario y no está ya autenticado en el contexto actual
    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

      UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

      // 5. Si el token es válido legalmente
      if (jwtProvider.isTokenValid(jwt, userDetails)) {

        // Creamos el objeto de autenticación que entiende Spring Security
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            userDetails,
            null,
            userDetails.getAuthorities());

        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        // 6. ¡Sellar la entrada! Metemos al usuario al contexto
        SecurityContextHolder.getContext().setAuthentication(authToken);
      }
    }

    // 7. Continuar el camino hacia el Controller
    filterChain.doFilter(request, response);
  }
}