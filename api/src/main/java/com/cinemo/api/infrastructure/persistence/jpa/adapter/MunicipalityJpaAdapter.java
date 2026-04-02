package com.cinemo.api.infrastructure.persistence.jpa.adapter;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.cinemo.api.domain.Municipality;
import com.cinemo.api.domain.ports.out.MunicipalityRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.entity.MunicipalityEntity;
import com.cinemo.api.infrastructure.persistence.jpa.mapper.MunicipalityMapper;
import com.cinemo.api.infrastructure.persistence.jpa.repository.MunicipalityJpaRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MunicipalityJpaAdapter implements MunicipalityRepositoryPort {

  private final MunicipalityJpaRepository jpaRepository;
  private final MunicipalityMapper mapper;

  @Override
  public Municipality save(Municipality municipality) {
    MunicipalityEntity entity = mapper.toEntity(municipality);
    MunicipalityEntity savedEntity = jpaRepository.save(entity);

    return mapper.toDomain(savedEntity);
  }

  @Override
  public Optional<Municipality> findByName(String name) {
    return jpaRepository.findByName(name).map(mapper::toDomain);
  }

  @Override
  public List<Municipality> findAll() {
    return jpaRepository.findAll().stream().map(mapper::toDomain).toList();
  }

  @Override
  public Optional<Municipality> findById(Long id) {
    return jpaRepository.findById(id).map(mapper::toDomain);
  }

}
