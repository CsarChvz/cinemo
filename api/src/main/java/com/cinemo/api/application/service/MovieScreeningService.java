package com.cinemo.api.application.service;

import java.util.List;
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

    @Override
    public MovieScreening update(MovieScreening movieScreening) {
        return movieScreeningRepositoryPort.modify(movieScreening);
    }

    @Override
    public void delete(MovieScreening movieScreening) {
        movieScreeningRepositoryPort.remove(movieScreening);
    }

    @Override
    public List<MovieScreening> getAll() {
        return movieScreeningRepositoryPort.findAll();
    }

}
