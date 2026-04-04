package com.cinemo.api.domain.ports.out;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.Cinema;

public interface CinemaRepositoryPort {

    Cinema save(Cinema cinema);

    List<Cinema> findAll();

    Optional<Cinema> findById(Long id);

    void delete(Cinema cinema);
}
