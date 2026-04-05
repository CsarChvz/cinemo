package com.cinemo.api.infrastructure.persistence.jpa.adapter;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.cinemo.api.domain.MovieScreening;
import com.cinemo.api.domain.ports.out.MovieScreeningRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.entity.MovieScreeningEntity;
import com.cinemo.api.infrastructure.persistence.jpa.mapper.MovieScreeningMapper;
import com.cinemo.api.infrastructure.persistence.jpa.repository.MovieScreeningJpaRepostory;

import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class MovieScreeningJpaAdapter implements MovieScreeningRepositoryPort {
    private final MovieScreeningJpaRepostory jpaRepository;
    private final MovieScreeningMapper mapper;
    @Override
    public MovieScreening create(MovieScreening movieScreening) {
        MovieScreeningEntity entity = mapper.toEntity(movieScreening);
        MovieScreeningEntity entitySaved = jpaRepository.save(entity);

        return mapper.toDomain(entitySaved);
    }

    @Override
    public Optional<MovieScreening> findById(Long id) {
        return jpaRepository.findById(id).map(mapper::toDomain);
    }

    @Override
    public List<MovieScreening> findAll() {
        return jpaRepository.findAll().stream().map(mapper::toDomain).toList();
    }

    @Override
    public MovieScreening modify(MovieScreening movieScreening) {
        MovieScreeningEntity entity = mapper.toEntity(movieScreening);
        MovieScreeningEntity savedEntity = jpaRepository.save(entity);

        return mapper.toDomain(savedEntity);
    }

    @Override
    public void remove(MovieScreening movieScreening) {
        MovieScreeningEntity entity = mapper.toEntity(movieScreening);
        jpaRepository.delete(entity);
    }

}
