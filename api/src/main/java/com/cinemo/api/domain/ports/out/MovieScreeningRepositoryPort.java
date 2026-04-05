package com.cinemo.api.domain.ports.out;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.MovieScreening;

public interface MovieScreeningRepositoryPort {
    MovieScreening create(MovieScreening movieScreening);

    Optional<MovieScreening> findById(Long id);

    List<MovieScreening> findAll();

    MovieScreening modify(MovieScreening movieScreening);

    void remove(MovieScreening movieScreening);

}
