package com.cinemo.api.infrastructure.web.controller.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDto {
    private String accessToken;
    private String type;
    private Long id;
    private String name;
    private String username;
    private String role;
}