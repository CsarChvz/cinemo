package com.cinemo.api.infrastructure.persistence.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemo.api.infrastructure.persistence.jpa.entity.CinemaEntity;

public interface CinemaJpaRepository extends JpaRepository<CinemaEntity, Long> {

}
