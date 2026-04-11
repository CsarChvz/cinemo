package com.cinemo.api.domain.ports.in.ticket;

import java.math.BigDecimal;
import java.util.List;

import com.cinemo.api.domain.Ticket;

public interface TicketUseCase {
    List<Ticket> castTickets(Long bookingId, List<Long> seatIds, BigDecimal precioPorAsiento);
    
    List<Ticket> getByBooking(Long bookingId);

    void nullTickets(Long bookingId);

}
