package com.cinemo.api.infrastructure.web.controller.dto.municipality;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MunicipalityResponseDto {

  private Long id;
  private String name;
  private Long stateId;
  private String stateName;

}