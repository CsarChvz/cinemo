package com.cinemo.api.domain.ports.in.cinema_room;

import java.util.List;

import com.cinemo.api.domain.CinemaRoom;

public interface SearchRoomUseCase {
    List<CinemaRoom> getRoomsByCinemaId(Long cinemaId);
}
