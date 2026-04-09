package com.cinemo.api.application.service;

import com.cinemo.api.domain.User;
import com.cinemo.api.domain.ports.in.auth.LoginUseCase;
import com.cinemo.api.domain.ports.in.auth.RegisterUserUseCase;
import com.cinemo.api.domain.ports.out.JwtPort;
import com.cinemo.api.domain.ports.out.PasswordEncoderPort;
import com.cinemo.api.domain.ports.out.UserRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthService implements LoginUseCase, RegisterUserUseCase {

  private final UserRepositoryPort userRepositoryPort;
  private final PasswordEncoderPort passwordEncoderPort;
  private final JwtPort jwtPort;

  @Override
  public User register(User user) {
    user.setPassword(passwordEncoderPort.encode(user.getPassword()));
    return userRepositoryPort.save(user);
  }

  @Override
  public String login(String username, String password) {
    // 1. Buscamos al usuario por su username
    return userRepositoryPort.findByUsername(username)
        .filter(user -> passwordEncoderPort.matches(password, user.getPassword()))
        .map(user -> jwtPort.generateToken(user))
        .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));
  }

}
