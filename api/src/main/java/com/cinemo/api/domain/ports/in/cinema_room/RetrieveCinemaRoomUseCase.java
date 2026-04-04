package com.cinemo.api.domain.ports.in.cinema_room;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.CinemaRoom;

public interface RetrieveCinemaRoomUseCase {
    Optional<CinemaRoom> getById(Long id);

    List<CinemaRoom> getCinemaRooms();

}
