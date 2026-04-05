package com.cinemo.api.infrastructure.persistence.jpa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemo.api.infrastructure.persistence.jpa.entity.StateEntity;

public interface StateJpaRepository extends JpaRepository<StateEntity, Long> {

    Optional<StateEntity> findByName(String name);

    List<StateEntity> findAll();
}
