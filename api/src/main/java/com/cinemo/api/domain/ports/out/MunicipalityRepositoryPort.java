package com.cinemo.api.domain.ports.out;

import java.util.Optional;

import com.cinemo.api.domain.Municipality;

public interface MunicipalityRepositoryPort {
  Municipality save(Municipality municipality);

  Optional<Municipality> findByName(String name);
}
