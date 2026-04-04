package com.cinemo.api.application.service;

import java.util.List;

import com.cinemo.api.domain.Cinema;
import com.cinemo.api.domain.ports.in.cinema.ManageCinemaUseCase;
import com.cinemo.api.domain.ports.in.cinema.RetrieveCinemaUseCase;
import com.cinemo.api.domain.ports.out.CinemaRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CinemaService implements ManageCinemaUseCase, RetrieveCinemaUseCase {
    private final CinemaRepositoryPort cinemaRepositoryPort;

    @Override
    public Cinema create(Cinema cinema) {
        return cinemaRepositoryPort.save(cinema);
    }

    @Override
    public List<Cinema> getCinemas() {
        return cinemaRepositoryPort.findAll();
    }

}
