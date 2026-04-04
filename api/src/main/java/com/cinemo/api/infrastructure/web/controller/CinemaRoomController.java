package com.cinemo.api.infrastructure.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.CinemaRoom;
import com.cinemo.api.domain.ports.in.cinema_room.ManageCinemaRoomUseCase;
import com.cinemo.api.domain.ports.in.cinema_room.RetrieveCinemaRoomUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.cinema_room.CinemaRoomDtoMapper;
import com.cinemo.api.infrastructure.web.controller.dto.cinema_room.CinemaRoomRequestDto;
import com.cinemo.api.infrastructure.web.controller.dto.cinema_room.CinemaRoomResponseDto;
import com.cinemo.api.infrastructure.web.controller.dto.cinema_room.CinemaRoomUpdateRequestDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/cinema-rooms")
@RequiredArgsConstructor
public class CinemaRoomController {
    private final ManageCinemaRoomUseCase manageCinemaRoomUseCase;
    private final RetrieveCinemaRoomUseCase retrieveCinemaRoomUseCase;
    private final CinemaRoomDtoMapper cinemaDtoMapper;

    @PostMapping
    public ResponseEntity<CinemaRoomResponseDto> createCinemaRoom(@Valid @RequestBody CinemaRoomRequestDto requestDto) {
        CinemaRoom cinema = cinemaDtoMapper.toDomain(requestDto);
        CinemaRoom cinemaSaved = manageCinemaRoomUseCase.create(cinema);

        return ResponseEntity.status(HttpStatus.CREATED).body(cinemaDtoMapper.toResponse(cinemaSaved));
    }

    @GetMapping
    public ResponseEntity<List<CinemaRoomResponseDto>> getAllCinemaRooms() {
        List<CinemaRoom> cinemas = retrieveCinemaRoomUseCase.getCinemaRooms();
        List<CinemaRoomResponseDto> responseDtos = cinemas.stream().map(cinemaDtoMapper::toResponse).toList();

        return ResponseEntity.status(HttpStatus.OK).body(responseDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<CinemaRoomResponseDto>> getById(@PathVariable Long id) {
        Optional<CinemaRoom> cinema = retrieveCinemaRoomUseCase.getById(id);
        Optional<CinemaRoomResponseDto> responseDto = cinema.map(cinemaDtoMapper::toResponse);

        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CinemaRoomResponseDto> update(@PathVariable Long id,
            @Valid @RequestBody CinemaRoomUpdateRequestDto requestDto) {
        return retrieveCinemaRoomUseCase.getById(id).map(
                existingCinemaRoom -> {
                    cinemaDtoMapper.updateDomainFromDto(requestDto, existingCinemaRoom);
                    CinemaRoom updated = manageCinemaRoomUseCase.update(existingCinemaRoom);
                    return ResponseEntity.ok(cinemaDtoMapper.toResponse(updated));
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {

        return retrieveCinemaRoomUseCase.getById(id).map(
                existingCinemaRoom -> {
                    manageCinemaRoomUseCase.delete(existingCinemaRoom);
                    return ResponseEntity.noContent().<Void>build();
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
