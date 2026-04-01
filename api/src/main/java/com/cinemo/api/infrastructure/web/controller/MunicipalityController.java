package com.cinemo.api.infrastructure.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.Municipality;
import com.cinemo.api.domain.ports.in.municipality.ManageMunicipalityUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.municipality.MunicipalityDtoMapper;
import com.cinemo.api.infrastructure.web.controller.dto.municipality.MunicipalityRequestDto;
import com.cinemo.api.infrastructure.web.controller.dto.municipality.MunicipalityResponseDto;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/muncipality")
@RequiredArgsConstructor
public class MunicipalityController {
  private final ManageMunicipalityUseCase manageMunicipalityUseCase;
  private final MunicipalityDtoMapper municipalityDtoMapper;

  @PostMapping
  public ResponseEntity<MunicipalityResponseDto> createState(@Valid @RequestBody MunicipalityRequestDto requestDto) {
    Municipality domain = municipalityDtoMapper.toDomain(requestDto);
    Municipality createdMunicipality = manageMunicipalityUseCase.create(domain);

    return ResponseEntity.status(HttpStatus.CREATED).body(municipalityDtoMapper.toResponse(createdMunicipality));
  }

}
