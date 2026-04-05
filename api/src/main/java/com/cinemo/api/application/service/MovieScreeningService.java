package com.cinemo.api.application.service;

import java.util.Optional;

import com.cinemo.api.domain.MovieScreening;
import com.cinemo.api.domain.ports.in.movie_screening.ManageMovieScreeningUseCase;
import com.cinemo.api.domain.ports.in.movie_screening.RetrieveMovieScreeningUseCase;
import com.cinemo.api.domain.ports.out.MovieScreeningRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MovieScreeningService implements ManageMovieScreeningUseCase, RetrieveMovieScreeningUseCase{

    private final MovieScreeningRepositoryPort movieScreeningRepositoryPort;

    @Override
    public Optional<MovieScreening> getById(Long id) {
        return movieScreeningRepositoryPort.findById(id);
    }

    @Override
    public MovieScreening create(MovieScreening movieScreening) {
        return movieScreeningRepositoryPort.create(movieScreening);
    }

}
