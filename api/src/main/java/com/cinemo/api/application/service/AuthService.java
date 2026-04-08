package com.cinemo.api.application.service;

import com.cinemo.api.domain.User;
import com.cinemo.api.domain.ports.in.auth.LoginUseCase;
import com.cinemo.api.domain.ports.in.auth.RegisterUserUseCase;
import com.cinemo.api.domain.ports.out.PasswordEncoderPort;
import com.cinemo.api.domain.ports.out.UserRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthService implements LoginUseCase, RegisterUserUseCase {

  private final UserRepositoryPort userRepositoryPort;
  private final PasswordEncoderPort passwordEncoderPort;

  @Override
  public User register(User user) {
    user.setPassword(passwordEncoderPort.encode(user.getPassword()));
    return userRepositoryPort.save(user);
  }
}
