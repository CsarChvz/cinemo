package com.cinemo.api.application.service;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.CinemaRoom;
import com.cinemo.api.domain.ports.in.cinema_room.ManageCinemaRoomUseCase;
import com.cinemo.api.domain.ports.in.cinema_room.RetrieveCinemaRoomUseCase;
import com.cinemo.api.domain.ports.out.CinemaRoomRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CinemaRoomService implements ManageCinemaRoomUseCase, RetrieveCinemaRoomUseCase {

    private final CinemaRoomRepositoryPort cinemaRoomRepositoryPort;

    @Override
    public Optional<CinemaRoom> getById(Long id) {
        return cinemaRoomRepositoryPort.findById(id);
    }

    @Override
    public CinemaRoom create(CinemaRoom cinemaRoom) {
        return cinemaRoomRepositoryPort.save(cinemaRoom);
    }

    @Override
    public List<CinemaRoom> getCinemaRooms() {
        return cinemaRoomRepositoryPort.findAll();
    }

    @Override
    public CinemaRoom update(CinemaRoom cinemaRoom) {
        return cinemaRoomRepositoryPort.modify(cinemaRoom);
    }

    @Override
    public void delete(CinemaRoom cinemaRoom) {
        cinemaRoomRepositoryPort.delete(cinemaRoom);
    }

}
