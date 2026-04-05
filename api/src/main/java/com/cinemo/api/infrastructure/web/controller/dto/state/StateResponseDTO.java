package com.cinemo.api.infrastructure.web.controller.dto.state;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StateResponseDTO {
    private Long id;
    private String name;
    private String code;
}
