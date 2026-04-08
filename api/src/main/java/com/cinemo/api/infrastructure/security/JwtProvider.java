package com.cinemo.api.infrastructure.security;

import com.cinemo.api.domain.User;
import com.cinemo.api.domain.ports.out.JwtPort;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtProvider implements JwtPort {

  @Value("${jwt.secret}")
  private String secret;

  public String generateTokenFromAuthentication(Authentication auth) {
    String username = auth.getName();

    String role = auth.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .findFirst()
        .orElse("USER");

    return buildToken(username, role);
  }

  // Modifica tu método original o crea este privado para no repetir lógica
  private String buildToken(String username, String role) {
    return Jwts.builder()
        .setSubject(username)
        .claim("role", role)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hora
        .signWith(getSignInKey(), SignatureAlgorithm.HS256)
        .compact();
  }

  // Puedes refactorizar el de dominio para que use el builder también
  @Override
  public String generateToken(User user) {
    return buildToken(user.getUsername(), user.getRole());
  }
  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public boolean isTokenValid(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
  }

  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(getSignInKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
  }

  private Key getSignInKey() {
    return Keys.hmacShaKeyFor(secret.getBytes());
  }
}