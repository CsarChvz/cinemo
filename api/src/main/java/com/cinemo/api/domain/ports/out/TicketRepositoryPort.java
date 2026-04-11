package com.cinemo.api.domain.ports.out;

import java.util.List;

import com.cinemo.api.domain.Ticket;

public interface TicketRepositoryPort {
    Ticket save(Ticket ticket);
    List<Ticket> findByBookingId(Long bookingId);
    void deleteByBookingId(Long bookingId);
}
