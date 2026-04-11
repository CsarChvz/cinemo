package com.cinemo.api.domain.ports.in.seat;

import java.util.List;

import com.cinemo.api.domain.Seat;

public interface ManageSeatUseCase {
    Seat createSeat(Seat seat);

    List<Seat> generateSeats(Long roomId, Integer capacity, Integer columns);

    List<Seat> saveAll(List<Seat> seats);
}
