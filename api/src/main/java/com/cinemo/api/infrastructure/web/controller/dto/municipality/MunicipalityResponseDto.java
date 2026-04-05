package com.cinemo.api.infrastructure.web.controller.dto.municipality;

import com.cinemo.api.infrastructure.web.controller.dto.state.StateResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MunicipalityResponseDto {
  private Long id;
  private String name;
  private StateResponseDTO state; // <-- Aquí está la clave para el objeto anidado
}