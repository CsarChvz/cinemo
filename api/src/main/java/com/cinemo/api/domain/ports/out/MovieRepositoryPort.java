package com.cinemo.api.domain.ports.out;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.Movie;

public interface MovieRepositoryPort {
    Movie create(Movie movie);

    Optional<Movie> findById(Long id);

    List<Movie> findAll();

    Movie modify(Movie movie);

    void delete(Movie movie);
}
