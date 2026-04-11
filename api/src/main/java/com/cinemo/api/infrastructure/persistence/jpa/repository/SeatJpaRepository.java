package com.cinemo.api.infrastructure.persistence.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemo.api.infrastructure.persistence.jpa.entity.SeatEntity;

public interface SeatJpaRepository extends JpaRepository<SeatEntity, Long> {
  
    List<SeatEntity> findByRoomId(Long roomId);

 
    List<SeatEntity> findByRoomIdOrderByRowLetterAscSeatNumberAsc(Long roomId);
}
