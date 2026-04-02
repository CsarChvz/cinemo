package com.cinemo.api.infrastructure.web.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.Municipality;
import com.cinemo.api.domain.ports.in.municipality.ManageMunicipalityUseCase;
import com.cinemo.api.domain.ports.in.municipality.RetrieveMunicipalityUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.municipality.MunicipalityDtoMapper;
import com.cinemo.api.infrastructure.web.controller.dto.municipality.MunicipalityRequestDto;
import com.cinemo.api.infrastructure.web.controller.dto.municipality.MunicipalityResponseDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/muncipality")
@RequiredArgsConstructor
public class MunicipalityController {
  private final ManageMunicipalityUseCase manageMunicipalityUseCase;
  private final RetrieveMunicipalityUseCase retrieveMunicipalityUseCase;
  private final MunicipalityDtoMapper municipalityDtoMapper;

  @GetMapping
  public ResponseEntity<List<MunicipalityResponseDto>> getAll() {
    List<Municipality> municipalities = retrieveMunicipalityUseCase.getMunicipalities();
    List<MunicipalityResponseDto> responseDTOs = municipalities.stream().map(municipalityDtoMapper::toResponse)
        .toList();
    return ResponseEntity.status(HttpStatus.OK).body(responseDTOs);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<MunicipalityResponseDto>> getById(@PathVariable Long id) {
    Optional<Municipality> municipalities = retrieveMunicipalityUseCase.getById(id);
    Optional<MunicipalityResponseDto> responseDTOs = municipalities.map(municipalityDtoMapper::toResponse);

    return ResponseEntity.status(HttpStatus.OK).body(responseDTOs);
  }

  @PostMapping
  public ResponseEntity<MunicipalityResponseDto> createState(@Valid @RequestBody MunicipalityRequestDto requestDto) {
    Municipality domain = municipalityDtoMapper.toDomain(requestDto);
    Municipality createdMunicipality = manageMunicipalityUseCase.create(domain);

    return ResponseEntity.status(HttpStatus.CREATED).body(municipalityDtoMapper.toResponse(createdMunicipality));
  }

}
