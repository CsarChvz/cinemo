package com.cinemo.api.infrastructure.persistence.jpa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemo.api.infrastructure.persistence.jpa.entity.CinemaEntity;

public interface CinemaJpaRepository extends JpaRepository<CinemaEntity, Long> {

  @EntityGraph(attributePaths = { "municipality" })
  List<CinemaEntity> findAll();

  @EntityGraph(attributePaths = { "municipality" })
  Optional<CinemaEntity> findById(Long id);
}
