package com.cinemo.api.infrastructure.persistence.jpa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemo.api.infrastructure.persistence.jpa.entity.MovieScreeningEntity;

public interface MovieScreeningJpaRepostory extends JpaRepository<MovieScreeningEntity, Long> {
    @Override
    @EntityGraph(attributePaths = {"movie", "room", "room.cinema"})
    List<MovieScreeningEntity> findAll();

    @Override
    @EntityGraph(attributePaths = {"movie", "room", "room.cinema"})
    Optional<MovieScreeningEntity> findById(Long id);
}
