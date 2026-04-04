package com.cinemo.api.infrastructure.persistence.jpa.adapter;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.cinemo.api.domain.Cinema;
import com.cinemo.api.domain.ports.out.CinemaRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.entity.CinemaEntity;
import com.cinemo.api.infrastructure.persistence.jpa.mapper.CinemaMapper;
import com.cinemo.api.infrastructure.persistence.jpa.repository.CinemaJpaRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CinemaJpaAdapter implements CinemaRepositoryPort {

    private final CinemaJpaRepository jpaRepository;
    private final CinemaMapper mapper;

    @Override
    public Cinema save(Cinema cinema) {
        CinemaEntity entity = mapper.toEntity(cinema);
        CinemaEntity entitySaved = jpaRepository.save(entity);

        return mapper.toDomain(entitySaved);
    }

    @Override
    public List<Cinema> findAll() {
        return jpaRepository.findAll().stream().map(mapper::toDomain).toList();
    }

    @Override
    public Optional<Cinema> findById(Long id) {
        return jpaRepository.findById(id).map(mapper::toDomain);
    }

    @Override
    public void delete(Cinema cinema) {
        CinemaEntity entity = mapper.toEntity(cinema);
        jpaRepository.delete(entity);
    }

}
