package com.cinemo.api.infrastructure.web.controller.dto.state;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class StateUpdateRequestDTO {
    @Size(min = 3, max = 100)
    private String name;

    @Size(min = 2, max = 5)
    private String code;
}
