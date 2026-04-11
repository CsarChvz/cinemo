package com.cinemo.api.infrastructure.config;

import com.cinemo.api.infrastructure.security.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Permite el uso de @PreAuthorize en los controladores
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
    return http
        .csrf(csrf -> csrf.disable()) // Deshabilitado porque usamos JWT (Stateless)
        .cors(cors -> cors.configure(http)) // ⚠️ IMPORTANTE: Asegúrate de tener un Bean de CORS configurado
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            // 1. Endpoints públicos de Auth
            .requestMatchers("/api/v1/auth/**").permitAll()

            // 2. Documentación Swagger (Pública)
            .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html",
                "/swagger-resources/**", "/webjars/**")
            .permitAll()

            // 3. Consultas (GET) son públicas para que vean la cartelera y asientos
            .requestMatchers(HttpMethod.GET, "/api/v1/**").permitAll()

            // 4. Operaciones de selección de asientos (POST) requieren estar autenticado
            // Aquí puedes usar .hasRole("USER") o dejar que @PreAuthorize en el Controller
            // lo maneje
            .requestMatchers(HttpMethod.POST, "/api/v1/seat-status/**").authenticated()
            .requestMatchers(HttpMethod.POST, "/api/v1/bookings/**").authenticated()
            .requestMatchers(HttpMethod.DELETE, "/api/v1/bookings/**").permitAll()

            // 5. Cualquier otra ruta no especificada requiere autenticación
            .anyRequest().authenticated())

        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }
}