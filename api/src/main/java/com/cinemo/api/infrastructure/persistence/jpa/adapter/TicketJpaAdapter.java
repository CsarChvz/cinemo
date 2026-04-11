package com.cinemo.api.infrastructure.persistence.jpa.adapter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.cinemo.api.domain.Ticket;
import com.cinemo.api.domain.ports.out.TicketRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.entity.TicketEntity;
import com.cinemo.api.infrastructure.persistence.jpa.mapper.TicketMapper;
import com.cinemo.api.infrastructure.persistence.jpa.repository.TicketJpaRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TicketJpaAdapter implements TicketRepositoryPort {
    private final TicketJpaRepository jpaRepository;
    private final TicketMapper mapper;
@Override
    @Transactional
public Ticket save(Ticket ticket) {
    // 1. Loggea esto para ver si el ID del booking llega aquí
    System.out.println("💾 Guardando ticket para booking: " + ticket.getBookingId());

    TicketEntity entity = mapper.toEntity(ticket);

    if (entity.getBooking() == null) {
        System.err.println("❌ ERROR: El mapper no asignó el Booking a la entidad!");
    }

    return mapper.toDomain(jpaRepository.save(entity));
}
    @Override
    public List<Ticket> findByBookingId(Long bookingId) {
        // Buscamos las entidades y las convertimos todas a dominio usando un Stream
        return jpaRepository.findByBookingId(bookingId)
                .stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteByBookingId(Long bookingId) {
        jpaRepository.deleteByBookingId(bookingId);
    }
}
