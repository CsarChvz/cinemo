package com.cinemo.api.infrastructure.web.controller.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserRequestDTO {

    @NotBlank(message = "El nombre no tiene que estar vacio")
    private String name;
}
