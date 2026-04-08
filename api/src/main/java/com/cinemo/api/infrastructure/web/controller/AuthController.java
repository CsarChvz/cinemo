package com.cinemo.api.infrastructure.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.User;
import com.cinemo.api.domain.ports.in.auth.LoginUseCase;
import com.cinemo.api.domain.ports.in.auth.RegisterUserUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.auth.LoginRequestDto;
import com.cinemo.api.infrastructure.web.controller.dto.auth.TokenResponseDto;
import com.cinemo.api.infrastructure.web.controller.dto.user.UserDtoMapper;
import com.cinemo.api.infrastructure.web.controller.dto.user.UserRequestDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final RegisterUserUseCase registerUserUseCase;
    private final LoginUseCase loginUseCase;
    private final UserDtoMapper userDtoMapper;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody UserRequestDto requestDto) {
        User user = userDtoMapper.toDomain(requestDto);
        registerUserUseCase.register(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponseDto> login(@Valid @RequestBody LoginRequestDto dto) {
        String token = loginUseCase.login(dto.getUsername(), dto.getPassword());

        return ResponseEntity.ok(new TokenResponseDto(token));
    }
}