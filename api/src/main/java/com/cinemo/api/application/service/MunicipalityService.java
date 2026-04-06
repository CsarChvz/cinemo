package com.cinemo.api.application.service;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.application.exceptions.DuplicateMunicipalityException;
import com.cinemo.api.domain.Municipality;
import com.cinemo.api.domain.ports.in.municipality.ManageMunicipalityUseCase;
import com.cinemo.api.domain.ports.in.municipality.RetrieveMunicipalityUseCase;
import com.cinemo.api.domain.ports.in.municipality.SearchMunicipalitiesUseCase;
import com.cinemo.api.domain.ports.out.MunicipalityRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
// Puerto de Entrada --> Servicio --> Puerto de Salida
public class MunicipalityService
    implements ManageMunicipalityUseCase, RetrieveMunicipalityUseCase, SearchMunicipalitiesUseCase {
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

  @Override
  public List<Municipality> getMunicipalities() {
    return municipalityRepositoryPort.findAll();
  }

  @Override
  public Optional<Municipality> getById(Long id) {
    return municipalityRepositoryPort.findById(id);
  }

  @Override
  public Municipality edit(Municipality municipality) {
    return municipalityRepositoryPort.modify(municipality);
  }

  @Override
  public void delete(Municipality municipality) {
    municipalityRepositoryPort.remove(municipality);
  }

  @Override
  public List<Municipality> getMunicipalitiesByStateId(Long stateId) {
    return municipalityRepositoryPort.findByStateId(stateId);
  }

}
