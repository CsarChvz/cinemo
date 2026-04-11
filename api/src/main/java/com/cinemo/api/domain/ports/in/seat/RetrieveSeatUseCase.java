package com.cinemo.api.domain.ports.in.seat;

import java.util.List;

import com.cinemo.api.domain.Seat;

public interface RetrieveSeatUseCase {
    List<Seat> getSeatsByRoom(Long roomId);
}
