package com.cinemo.api.domain.ports.in.municipality;

import com.cinemo.api.domain.Municipality;

public interface ManageMunicipalityUseCase {
  Municipality create(Municipality municipality);
}
