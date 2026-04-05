package com.cinemo.api.application.service;

import java.util.Optional;

import com.cinemo.api.domain.Movie;
import com.cinemo.api.domain.ports.in.movie.ManageMovieUseCase;
import com.cinemo.api.domain.ports.in.movie.RetrieveMovieUseCase;
import com.cinemo.api.domain.ports.out.MovieRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MovieService implements ManageMovieUseCase, RetrieveMovieUseCase {
    private final MovieRepositoryPort movieRepositoryPort;

    @Override
    public Optional<Movie> getById(Long id) {  
        return movieRepositoryPort.findById(id);
    }

    @Override
    public Movie create(Movie movie) {
        return movieRepositoryPort.create(movie);
    }

}
