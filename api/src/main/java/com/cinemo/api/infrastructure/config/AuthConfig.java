package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.cinemo.api.application.service.AuthService;
import com.cinemo.api.domain.ports.in.auth.LoginUseCase;
import com.cinemo.api.domain.ports.in.auth.RegisterUserUseCase;
import com.cinemo.api.domain.ports.out.JwtPort;
import com.cinemo.api.domain.ports.out.PasswordEncoderPort;
import com.cinemo.api.domain.ports.out.UserRepositoryPort;

@Component
public class AuthConfig {
    @Bean
    public RegisterUserUseCase registerUserUseCase(
            UserRepositoryPort userRepositoryPort,
            PasswordEncoderPort passwordEncoderPort,
            JwtPort jwtPort) {

        return new AuthService(userRepositoryPort, passwordEncoderPort, jwtPort);
    }

    @Bean
    public LoginUseCase loginUseCase(
            UserRepositoryPort userRepositoryPort,
            PasswordEncoderPort passwordEncoderPort,
            JwtPort jwtPort) { // <--- Spring inyectará el JwtProvider aquí

        return new AuthService(userRepositoryPort, passwordEncoderPort, jwtPort);
    }
}
