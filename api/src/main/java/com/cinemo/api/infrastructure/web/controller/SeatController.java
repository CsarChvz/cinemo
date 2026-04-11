package com.cinemo.api.infrastructure.web.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.Seat;
import com.cinemo.api.domain.ports.in.seat.ManageSeatUseCase;
import com.cinemo.api.domain.ports.in.seat.RetrieveSeatUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.seat.SeatDtoMapper;
import com.cinemo.api.infrastructure.web.controller.dto.seat.SeatRequestDto;
import com.cinemo.api.infrastructure.web.controller.dto.seat.SeatResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/seats")
@RequiredArgsConstructor
public class SeatController {

    private final ManageSeatUseCase manageSeatUseCase;
    private final RetrieveSeatUseCase retrieveSeatUseCase;
    private final SeatDtoMapper dtoMapper;

    @GetMapping
    public ResponseEntity<List<SeatResponseDto>> getByRoom(@RequestParam Long roomId){
        List<Seat> seats = retrieveSeatUseCase.getSeatsByRoom(roomId);
        List<SeatResponseDto> responseDtos = seats.stream().map(dtoMapper::toResponse).toList();

        return ResponseEntity.ok(responseDtos);
    }

    @PostMapping
    public ResponseEntity<SeatResponseDto> create(@RequestBody SeatRequestDto dto){
        Seat seat = dtoMapper.toDomain(dto);
        Seat seatSaved = manageSeatUseCase.createSeat(seat);

        return ResponseEntity.ok(dtoMapper.toResponse(seatSaved));
    }

}