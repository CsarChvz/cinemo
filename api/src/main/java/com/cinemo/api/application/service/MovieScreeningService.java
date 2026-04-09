package com.cinemo.api.application.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.cinemo.api.application.exceptions.BusinessException;
import com.cinemo.api.domain.MovieScreening;
import com.cinemo.api.domain.ports.in.movie_screening.ManageMovieScreeningUseCase;
import com.cinemo.api.domain.ports.in.movie_screening.RetrieveMovieScreeningUseCase;
import com.cinemo.api.domain.ports.out.MovieScreeningRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MovieScreeningService implements ManageMovieScreeningUseCase, RetrieveMovieScreeningUseCase{

    private final MovieScreeningRepositoryPort movieScreeningRepositoryPort;

    @Override
    public Optional<MovieScreening> getById(Long id) {
        return movieScreeningRepositoryPort.findById(id);
    }


    @Override
    public MovieScreening update(MovieScreening movieScreening) {
        return movieScreeningRepositoryPort.modify(movieScreening);
    }

    @Override
    public void delete(MovieScreening movieScreening) {
        movieScreeningRepositoryPort.remove(movieScreening);
    }

    @Override
    public List<MovieScreening> getAll() {
        return movieScreeningRepositoryPort.findAll();
    }

    @Override
    public List<MovieScreening> search(Long movieId, Long stateId, Long municipalityId, Long cinemaId) {
        return movieScreeningRepositoryPort.search(movieId, stateId, municipalityId, cinemaId);
    }

    @Override
    public MovieScreening create(MovieScreening newScreening) {
        // 1. Obtener funciones existentes en esa sala -> Solo por el dia
        List<MovieScreening> existingOnes = movieScreeningRepositoryPort.findByRoomIdAndDate(
                newScreening.getRoom().getId(),
                newScreening.getStart().toLocalDate());

        LocalDateTime requestedStart = newScreening.getStart();
        LocalDateTime requestedEndWithCleaning = newScreening.getEnd().plusMinutes(30);

        for (MovieScreening existing : existingOnes) {
            LocalDateTime existingStart = existing.getStart();
            LocalDateTime existingEndWithCleaning = existing.getEnd().plusMinutes(30);

            // Lógica de traslape de intervalos
            boolean overlaps = requestedStart.isBefore(existingEndWithCleaning)
                    && requestedEndWithCleaning.isAfter(existingStart);

            if (overlaps) {
                // Lanzamos una excepción personalizada de negocio
                throw new BusinessException(
                        "Conflicto de horario: La sala está ocupada o en limpieza desde " +
                                existingStart.toLocalTime() + " hasta " + existingEndWithCleaning.toLocalTime());
            }
        }

        return movieScreeningRepositoryPort.create(newScreening);
    }

}
