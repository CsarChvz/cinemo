package com.cinemo.api.infrastructure.web.controller.dto.state;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StateRequestDTO {
    @NotBlank(message = "El nombre no tiene que estar vacio")
    private String name;

    private String code;
}
