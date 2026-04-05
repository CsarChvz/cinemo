package com.cinemo.api.domain.ports.in.movie;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.Movie;

public interface RetrieveMovieUseCase {
    Optional<Movie> getById(Long id);

    List<Movie> getMovies();

}
