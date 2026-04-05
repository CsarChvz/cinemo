package com.cinemo.api.domain.ports.in.movie_screening;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.MovieScreening;

public interface RetrieveMovieScreeningUseCase {
    Optional<MovieScreening> getById(Long id);

    List<MovieScreening> getAll();
}
