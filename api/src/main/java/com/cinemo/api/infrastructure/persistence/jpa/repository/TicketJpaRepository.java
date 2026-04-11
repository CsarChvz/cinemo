package com.cinemo.api.infrastructure.persistence.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemo.api.infrastructure.persistence.jpa.entity.TicketEntity;

public interface TicketJpaRepository extends JpaRepository<TicketEntity, Long>{

    List<TicketEntity> findByBookingId(Long bookingId);

    // Para eliminar
    void deleteByBookingId(Long bookingId);
}
