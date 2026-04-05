package com.cinemo.api.domain.ports.in.cinema_room;

import com.cinemo.api.domain.CinemaRoom;

public interface ManageCinemaRoomUseCase {
    CinemaRoom create(CinemaRoom cinemaRoom);
    
    CinemaRoom update(CinemaRoom cinemaRoom);

    void delete(CinemaRoom cinemaRoom);
}
