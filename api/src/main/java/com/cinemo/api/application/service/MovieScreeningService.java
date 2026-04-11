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
public class MovieScreeningService implements ManageMovieScreeningUseCase, RetrieveMovieScreeningUseCase {

    private final MovieScreeningRepositoryPort movieScreeningRepositoryPort;

    @Override
    public Optional<MovieScreening> getById(Long id) {
        return movieScreeningRepositoryPort.findById(id);
    }

    @Override
    public MovieScreening update(MovieScreening movieScreening) {
        // Ejecutamos la validación antes de modificar
        // Pasamos el ID para ignorar la función actual en la comparación
        validateScreeningOverlap(movieScreening, movieScreening.getId());

        return movieScreeningRepositoryPort.modify(movieScreening);
    }

    @Override
    public MovieScreening create(MovieScreening newScreening) {
        // Para crear, el ID es nulo o no importa en la comparación
        validateScreeningOverlap(newScreening, null);

        return movieScreeningRepositoryPort.create(newScreening);
    }


    private void validateScreeningOverlap(MovieScreening screening, Long currentId) {
        List<MovieScreening> existingOnes = movieScreeningRepositoryPort.findByRoomIdAndDate(
                screening.getRoom().getId(),
                screening.getStart().toLocalDate());

        LocalDateTime requestedStart = screening.getStart();
        LocalDateTime requestedEndWithCleaning = screening.getEnd().plusMinutes(30);

        for (MovieScreening existing : existingOnes) {
            if (currentId != null && existing.getId().equals(currentId)) {
                continue;
            }

            LocalDateTime existingStart = existing.getStart();
            LocalDateTime existingEndWithCleaning = existing.getEnd().plusMinutes(30);


            boolean overlaps = requestedStart.isBefore(existingEndWithCleaning)
                    && requestedEndWithCleaning.isAfter(existingStart);

            if (overlaps) {
                throw new BusinessException(
                        "Conflicto de horario: La sala ya tiene una función programada o en limpieza desde " +
                                existingStart.toLocalTime() + " hasta " + existingEndWithCleaning.toLocalTime());
            }
        }
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
}