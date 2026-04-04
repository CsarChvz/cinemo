package com.cinemo.api.infrastructure.persistence.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemo.api.infrastructure.persistence.jpa.entity.CinemaEntity;

public interface CinemaJpaRepository extends JpaRepository<CinemaEntity, Long> {

  @EntityGraph(attributePaths = { "municipality" })
  List<CinemaEntity> findAll();
}
