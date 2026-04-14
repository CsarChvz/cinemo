package com.cinemo.api.infrastructure.web.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.Ticket;
import com.cinemo.api.domain.ports.in.ticket.TicketUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.ticket.TicketDtoMapper;
import com.cinemo.api.infrastructure.web.controller.dto.ticket.TicketListResponseDto;
import com.cinemo.api.infrastructure.web.controller.dto.ticket.TicketResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketUseCase ticketUseCase;
    private final TicketDtoMapper ticketDtoMapper;

    @GetMapping
    public ResponseEntity<TicketListResponseDto> getByBooking(@RequestParam Long bookingId) {
        List<Ticket> tickets = ticketUseCase.getByBooking(bookingId);

        List<TicketResponseDto> ticketResponses = ticketDtoMapper.toResponseList(tickets);

        return ResponseEntity.ok(new TicketListResponseDto(
                bookingId,
                tickets.size(),
                ticketResponses));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping
    public ResponseEntity<Void> anular(@RequestParam Long bookingId) {
        ticketUseCase.nullTickets(bookingId);
        return ResponseEntity.noContent().build();
    }
}