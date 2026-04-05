package com.cinemo.api.infrastructure.persistence.jpa.adapter;

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

}
