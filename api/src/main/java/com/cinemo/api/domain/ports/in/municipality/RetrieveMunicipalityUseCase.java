package com.cinemo.api.domain.ports.in.municipality;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.Municipality;

public interface RetrieveMunicipalityUseCase {
    List<Municipality> getMunicipalities();

    Optional<Municipality> getById(Long stateId);

}
