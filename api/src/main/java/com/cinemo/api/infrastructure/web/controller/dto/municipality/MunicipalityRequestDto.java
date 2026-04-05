package com.cinemo.api.infrastructure.web.controller.dto.municipality;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class MunicipalityRequestDto {

  @NotBlank(message = "El nombre no puede estar vacío")
  @Size(max = 100, message = "El nombre no puede exceder los 100 caracteres")
  private String name;

  @NotNull(message = "El ID del estado es obligatorio")
  private Long stateId;
}
