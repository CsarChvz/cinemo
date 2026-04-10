package com.cinemo.api.infrastructure.persistence.jpa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemo.api.infrastructure.persistence.jpa.entity.SeatStatusEntity;

public interface SeatStatusJpaRepository  extends JpaRepository<SeatStatusEntity, Long> {
    List<SeatStatusEntity> findByScreening_Id(Long movieScreeningId);

    Optional<SeatStatusEntity> findBySeat_IdAndScreening_Id(Long seatId, Long movieScreeningId);
}
