package com.cinemo.api.application.service;

import com.cinemo.api.domain.ports.in.auth.LoginUseCase;
import com.cinemo.api.domain.ports.in.auth.RegisterUserUseCase;
import com.cinemo.api.domain.ports.out.PasswordEncoderPort;
import com.cinemo.api.domain.ports.out.UserRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthService implements LoginUseCase, RegisterUserUseCase {

  private final UserRepositoryPort userRepositoryPort;
  private final PasswordEncoderPort passwordEncoderPort;
}
