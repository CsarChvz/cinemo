package com.cinemo.api.infrastructure.web.controller.dto.cinema;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CinemaRequestDto {
  @NotBlank(message = "El nombre no puede estar vacío")
  @Size(max = 100, message = "El nombre no puede exceder los 100 caracteres")
  private String name;

  @Size(max = 200, message = "La dirección no puede exceder los 200 caracteres")
  private String address;

  @NotNull(message = "El ID del municipio es obligatorio")
  private Long municipalityId;
}