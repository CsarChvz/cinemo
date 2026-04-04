package com.cinemo.api.infrastructure.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.Cinema;
import com.cinemo.api.domain.ports.in.cinema.ManageCinemaUseCase;
import com.cinemo.api.domain.ports.in.cinema.RetrieveCinemaUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.cinema.CinemaDtoMapper;
import com.cinemo.api.infrastructure.web.controller.dto.cinema.CinemaRequestDto;
import com.cinemo.api.infrastructure.web.controller.dto.cinema.CinemaResponseDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/cinema")
@RequiredArgsConstructor
public class CinemaController {
    private final ManageCinemaUseCase manageCinemaUseCase;
    private final RetrieveCinemaUseCase retrieveCinemaUseCase;
    private final CinemaDtoMapper cinemaDtoMapper;

    @PostMapping
    public ResponseEntity<CinemaResponseDto> createCinema(@Valid @RequestBody CinemaRequestDto requestDto) {
        Cinema cinema = cinemaDtoMapper.toDomain(requestDto);
        Cinema cinemaSaved = manageCinemaUseCase.create(cinema);

        return ResponseEntity.status(HttpStatus.CREATED).body(cinemaDtoMapper.toResponse(cinemaSaved));
    }

    @GetMapping
    public ResponseEntity<List<CinemaResponseDto>> getAllCinemas() {
        List<Cinema> cinemas = retrieveCinemaUseCase.getCinemas();
        List<CinemaResponseDto> responseDtos = cinemas.stream().map(cinemaDtoMapper::toResponse).toList();

        return ResponseEntity.status(HttpStatus.OK).body(responseDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<CinemaResponseDto>> getById(@PathVariable Long id) {
        Optional<Cinema> cinema = retrieveCinemaUseCase.getById(id);
        Optional<CinemaResponseDto> responseDto = cinema.map(cinemaDtoMapper::toResponse);

        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {

        return retrieveCinemaUseCase.getById(id).map(
                existingCinema -> {
                    manageCinemaUseCase.delete(existingCinema);
                    return ResponseEntity.noContent().<Void>build();
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
