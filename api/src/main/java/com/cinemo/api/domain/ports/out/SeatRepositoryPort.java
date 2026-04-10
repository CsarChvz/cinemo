package com.cinemo.api.domain.ports.out;

import java.util.List;

import com.cinemo.api.domain.Seat;

public interface SeatRepositoryPort {
    List<Seat> findByRoomId(Long roomdId);
    Seat save(Seat seat);

    List<Seat> saveAll(List<Seat> seats);
}
