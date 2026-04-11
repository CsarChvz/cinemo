package com.cinemo.api.infrastructure.persistence.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemo.api.infrastructure.persistence.jpa.entity.BookingEntity;

public interface BookingJpaRepository extends JpaRepository<BookingEntity, Long> {
    List<BookingEntity> findByUserId(Long userId);
}
