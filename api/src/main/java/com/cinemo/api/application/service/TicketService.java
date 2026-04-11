package com.cinemo.api.application.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.cinemo.api.domain.Ticket;
import com.cinemo.api.domain.ports.in.ticket.TicketUseCase;
import com.cinemo.api.domain.ports.out.TicketRepositoryPort;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TicketService implements TicketUseCase {
    private final TicketRepositoryPort ticketRepositoryPort;

    @Override
    @Transactional
    public List<Ticket> castTickets(Long bookingId, List<Long> seatIds, BigDecimal precioPorAsiento) {
        return seatIds.stream().map(seatId -> {
            Ticket ticket = new Ticket();
            ticket.setBookingId(bookingId);
            ticket.setSeatId(seatId);
            ticket.setTicketCode(generarCodigo(bookingId, seatId));
            ticket.setPrice(precioPorAsiento);
            ticket.setIssuedAt(LocalDateTime.now());

            // Guardamos directamente en la DB
            return ticketRepositoryPort.save(ticket);
        }).toList();
    }

    @Override
    public List<Ticket> getByBooking(Long bookingId) {
        return ticketRepositoryPort.findByBookingId(bookingId);
    }


    @Override
    public void nullTickets(Long bookingId) {
        ticketRepositoryPort.deleteByBookingId(bookingId);
    }

    private String generarCodigo(Long bookingId, Long seatId) {
        return "TK" + bookingId + "-" + seatId + "-"
                + System.currentTimeMillis() % 10000;
    }
}
