package com.cinemo.api.infrastructure.persistence.jpa.adapter;


import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Component;

import com.cinemo.api.domain.Booking;
import com.cinemo.api.domain.ports.out.BookingRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.entity.BookingEntity;
import com.cinemo.api.infrastructure.persistence.jpa.entity.SeatStatusEntity;
import com.cinemo.api.infrastructure.persistence.jpa.mapper.BookingMapper;
import com.cinemo.api.infrastructure.persistence.jpa.repository.BookingJpaRepository;
import com.cinemo.api.infrastructure.persistence.jpa.repository.SeatStatusJpaRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BookingJpaAdapter implements BookingRepositoryPort{

private final BookingJpaRepository jpaRepository;
    private final SeatStatusJpaRepository seatStatusJpaRepository; 
    private final BookingMapper mapper;

    @Override
    public Booking save(Booking booking) {
        BookingEntity entity = mapper.toEntity(booking);

        if (booking.getSeatStatusIds() != null && !booking.getSeatStatusIds().isEmpty()) {
            List<SeatStatusEntity> seats = seatStatusJpaRepository.findAllById(booking.getSeatStatusIds());
            entity.setSeatStatuses(new HashSet<>(seats));
        }

        BookingEntity entitySaved = jpaRepository.save(entity);

        return mapper.toDomain(entitySaved);
    }
    @Override
    public void updateStatus(Long bookId, String status) {

        BookingEntity entity = jpaRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("No se encontró el booking con ID: " + bookId));
        entity.setStatus(status);
        jpaRepository.save(entity);
    }
    
}
