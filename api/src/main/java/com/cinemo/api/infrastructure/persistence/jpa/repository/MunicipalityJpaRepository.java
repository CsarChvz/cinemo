package com.cinemo.api.infrastructure.persistence.jpa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemo.api.infrastructure.persistence.jpa.entity.MunicipalityEntity;

public interface MunicipalityJpaRepository extends JpaRepository<MunicipalityEntity, Long> {
  Optional<MunicipalityEntity> findByName(String name);

  @EntityGraph(attributePaths = { "state" })
  List<MunicipalityEntity> findAll();

  @EntityGraph(attributePaths = { "state" })
  Optional<MunicipalityEntity> findById(Long id);
}
