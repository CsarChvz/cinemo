package com.cinemo.api.domain.ports.in.cinema;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.Cinema;

public interface RetrieveCinemaUseCase {
  List<Cinema> getCinemas();

  Optional<Cinema> getById(Long id);
}
