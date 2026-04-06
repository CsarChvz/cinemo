package com.cinemo.api.infrastructure.persistence.jpa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemo.api.infrastructure.persistence.jpa.entity.CinemaRoomEntity;

public interface CinemaRoomJpaRepository extends JpaRepository<CinemaRoomEntity, Long> {
  @EntityGraph(attributePaths = { "cinema" })
  List<CinemaRoomEntity> findAll();

  @EntityGraph(attributePaths = { "cinema" })
  Optional<CinemaRoomEntity> findById(Long id);

  List<CinemaRoomEntity> findByCinemaId(Long cinemaId);
}
