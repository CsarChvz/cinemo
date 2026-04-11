package com.cinemo.api.domain.ports.out;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.SeatStatus;

public interface SeatStatusRepositoryPort {


    List<SeatStatus> findByMovieScreeningId(Long movieScreeningId);

    Optional<SeatStatus> findBySeatIdAndMovieScreeningId(Long seatId, Long movieScreeningId);

    SeatStatus save(SeatStatus seatStatus);

    List<SeatStatus> saveAll(List<SeatStatus> seatStatuses);
}
