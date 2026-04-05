package com.cinemo.api.infrastructure.persistence.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemo.api.infrastructure.persistence.jpa.entity.MovieEntity;

public interface MovieJpaRepository extends JpaRepository<MovieEntity, Long>{

}
