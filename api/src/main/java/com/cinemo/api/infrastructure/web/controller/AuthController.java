package com.cinemo.api.infrastructure.web.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.User;
import com.cinemo.api.domain.ports.in.auth.LoginUseCase;
import com.cinemo.api.domain.ports.in.auth.RegisterUserUseCase;
import com.cinemo.api.domain.ports.in.user.RetriveUserUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.auth.AuthResponseDto;
import com.cinemo.api.infrastructure.web.controller.dto.auth.LoginRequestDto;
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
    private final RetriveUserUseCase retriveUserUseCase;
    private final UserDtoMapper userDtoMapper;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody UserRequestDto requestDto) {
        User user = userDtoMapper.toDomain(requestDto);
        registerUserUseCase.register(user);

        return new ResponseEntity<>(Map.of("message", "Usuario creado"), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody LoginRequestDto dto) {
        String token = loginUseCase.login(dto.getUsername(), dto.getPassword());
        Optional<User> user = retriveUserUseCase.getByUsername(dto.getUsername());
        AuthResponseDto authResponse = new AuthResponseDto(token, "Bearer", user.get().getId(), user.get().getName(),
                user.get().getUsername(), user.get().getRole());

        return ResponseEntity.ok(authResponse);
    }

}