package com.cinemo.api.application.service;

import com.cinemo.api.domain.Cinema;
import com.cinemo.api.domain.ports.in.cinema.ManageCinemaUseCase;
import com.cinemo.api.domain.ports.out.CinemaRepositoryPort;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class CinemaService implements ManageCinemaUseCase {
    private final CinemaRepositoryPort cinemaRepositoryPort;
    @Override
    public Cinema create(Cinema cinema) {
        return cinemaRepositoryPort.save(cinema);
    }

}
