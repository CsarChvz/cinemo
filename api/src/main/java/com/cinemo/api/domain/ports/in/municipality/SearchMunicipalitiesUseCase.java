package com.cinemo.api.domain.ports.in.municipality;

import java.util.List;

import com.cinemo.api.domain.Municipality;

public interface SearchMunicipalitiesUseCase {
    List<Municipality> getMunicipalitiesByStateId(Long stateId);

}
