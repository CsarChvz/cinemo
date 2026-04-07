package com.cinemo.api.domain.ports.out;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.CinemaRoom;

public interface CinemaRoomRepositoryPort {
    CinemaRoom save(CinemaRoom cinemaRoom);
    Optional<CinemaRoom> findById(Long id);
    List<CinemaRoom> findAll();
    CinemaRoom modify(CinemaRoom cinemaRoom);
    void delete(CinemaRoom cinemaRoom);

    List<CinemaRoom> findRoomsByCinemaId(Long roomId);
}
