package com.cinemo.api.infrastructure.web.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.SeatStatus;
import com.cinemo.api.domain.ports.in.seat_status.SeatStatusUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.seat_status.ReleaseSessionRequestDto;
import com.cinemo.api.infrastructure.web.controller.dto.seat_status.SeatStatusDtoMapper;
import com.cinemo.api.infrastructure.web.controller.dto.seat_status.SeatStatusResponseDto;
import com.cinemo.api.infrastructure.web.controller.dto.seat_status.SelectSeatRequestDto;
import com.cinemo.api.infrastructure.web.controller.dto.seat_status.WaitlistResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/seat-status")
@RequiredArgsConstructor
public class SeatStatusController {
    private final SeatStatusUseCase seatStatusUseCase;
    private final SeatStatusDtoMapper mapper;

    // Asientos con el status de una función
    @GetMapping
    public ResponseEntity<List<SeatStatusResponseDto>> getByFunction(@RequestParam Long functionId) {
        List<SeatStatus> statuses = seatStatusUseCase.getStatusByFunction(functionId);

        return ResponseEntity.ok(mapper.toResponseList(statuses));
    }

    @PostMapping("/select")
    public ResponseEntity<SeatStatusResponseDto> select(@RequestBody SelectSeatRequestDto req) {
        SeatStatus updated = seatStatusUseCase.selectSeat(
                req.getMovieScreeningId(), req.getSeatId(), req.getUserId());

        return ResponseEntity.ok(mapper.toResponse(updated));
    }
    // Deshacer último asiento seleccionado — pop de la pila
    // Front desmarca el asiento cuyo id retorna este endpoint
    @PostMapping("/undo")
    public ResponseEntity<Long> undo(
            @RequestParam Long functionId,
            @RequestParam Long userId) {
        Long seatId = seatStatusUseCase.undoLastSelection(functionId, userId);
        return ResponseEntity.ok(seatId);
    }

    // Entrar a lista de espera de un asiento ocupado — encolar
    @PostMapping("/{seatId}/waitlist")
    public ResponseEntity<Void> joinWaitlist(
            @PathVariable Long seatId,
            @RequestParam Long functionId,
            @RequestParam Long userId) {
        seatStatusUseCase.joinWaitlist(functionId, seatId, userId);
        return ResponseEntity.ok().build();
    }

    // Ver posición en la cola de espera
    // Front muestra badge "Lugar #3 en lista de espera"
    @GetMapping("/{seatId}/waitlist/position")
    public ResponseEntity<WaitlistResponseDto> getPosition(
            @PathVariable Long seatId,
            @RequestParam Long functionId,
            @RequestParam Long userId) {
        Long pos = seatStatusUseCase.getWaitlistPosition(functionId, seatId, userId);
        return ResponseEntity.ok(new WaitlistResponseDto(
            pos, -1, "Estás en el lugar #" + pos + " de la fila"));
    }

    @PostMapping("/release-session")
    public ResponseEntity<Void> releaseSession(@RequestBody ReleaseSessionRequestDto req) {
        seatStatusUseCase.releaseUserSession(req.getMovieScreeningId(), req.getUserId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/deselect")
    public ResponseEntity<Void> deselectSeat(@RequestBody SelectSeatRequestDto req) {
        seatStatusUseCase.deselectSeat(
                req.getMovieScreeningId(), req.getSeatId(), req.getUserId());
        return ResponseEntity.ok().build();
    }
}
