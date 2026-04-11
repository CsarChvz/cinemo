package com.cinemo.api.application.service;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.CinemaRoom;
import com.cinemo.api.domain.ports.in.cinema_room.ManageCinemaRoomUseCase;
import com.cinemo.api.domain.ports.in.cinema_room.RetrieveCinemaRoomUseCase;
import com.cinemo.api.domain.ports.in.cinema_room.SearchRoomUseCase;
import com.cinemo.api.domain.ports.in.seat.ManageSeatUseCase;
import com.cinemo.api.domain.ports.out.CinemaRoomRepositoryPort;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CinemaRoomService implements ManageCinemaRoomUseCase, RetrieveCinemaRoomUseCase, SearchRoomUseCase {

    private final CinemaRoomRepositoryPort cinemaRoomRepositoryPort;
    private final ManageSeatUseCase manageSeatUseCase;

    @Override
    public Optional<CinemaRoom> getById(Long id) {
        return cinemaRoomRepositoryPort.findById(id);
    }

    @Override
    @Transactional
    public CinemaRoom create(CinemaRoom cinemaRoom) {

        CinemaRoom savedRoom = cinemaRoomRepositoryPort.save(cinemaRoom);

        manageSeatUseCase.generateSeats(savedRoom.getId(), savedRoom.getCapacity(), savedRoom.getColumnsPerRow());

        return savedRoom;
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

    @Override
    public List<CinemaRoom> getRoomsByCinemaId(Long cinemaId) {
        return cinemaRoomRepositoryPort.findRoomsByCinemaId(cinemaId);
    }

}
