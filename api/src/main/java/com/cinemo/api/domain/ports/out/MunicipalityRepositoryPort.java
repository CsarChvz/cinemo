package com.cinemo.api.domain.ports.out;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.Municipality;

public interface MunicipalityRepositoryPort {
  Municipality save(Municipality municipality);

  Optional<Municipality> findByName(String name);

  List<Municipality> findAll();

  Optional<Municipality> findById(Long id);

  Municipality modify(Municipality municipality);

  void remove(Municipality municipality);

  List<Municipality> findByStateId(Long stateId);
}
