package com.cinemo.api.domain.ports.out;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.MovieScreening;

public interface MovieScreeningRepositoryPort {
    MovieScreening create(MovieScreening movieScreening);

    Optional<MovieScreening> findById(Long id);

    List<MovieScreening> findAll();

    MovieScreening modify(MovieScreening movieScreening);

    void remove(MovieScreening movieScreening);

    List<MovieScreening> search(Long movieId, Long stateId, Long municipalityId, Long cinemaId);

    List<MovieScreening> findByRoomIdAndDate(Long roomId, LocalDate date);
}
