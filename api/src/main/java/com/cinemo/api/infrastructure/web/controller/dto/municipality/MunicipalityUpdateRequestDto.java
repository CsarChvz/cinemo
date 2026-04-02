package com.cinemo.api.infrastructure.web.controller.dto.municipality;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class MunicipalityUpdateRequestDto {

  @Size(max = 100, message = "El nombre no puede exceder los 100 caracteres")
  private String name;

  private Long stateId;
}


