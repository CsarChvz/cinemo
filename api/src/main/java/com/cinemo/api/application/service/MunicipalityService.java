package com.cinemo.api.application.service;

import com.cinemo.api.application.exceptions.DuplicateMunicipalityException;
import com.cinemo.api.domain.Municipality;
import com.cinemo.api.domain.ports.in.municipality.ManageMunicipalityUseCase;
import com.cinemo.api.domain.ports.out.MunicipalityRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
// Puerto de Entrada --> Servicio --> Puerto de Salida
public class MunicipalityService implements ManageMunicipalityUseCase {
  private final MunicipalityRepositoryPort municipalityRepositoryPort;

  @Override
  public Municipality create(Municipality municipality) {
    // Encontrar si hay duplicados
    municipalityRepositoryPort.findByName(municipality.getName()).ifPresent(
        existing -> {
          throw new DuplicateMunicipalityException(municipality.getName());
        });

    return municipalityRepositoryPort.save(municipality);
  }

}
