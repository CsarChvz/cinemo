package com.cinemo.api.infrastructure.persistence.jpa.adapter;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.cinemo.api.domain.Movie;
import com.cinemo.api.domain.ports.out.MovieRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.entity.MovieEntity;
import com.cinemo.api.infrastructure.persistence.jpa.mapper.MovieMapper;
import com.cinemo.api.infrastructure.persistence.jpa.repository.MovieJpaRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MovieJpaAdapter implements MovieRepositoryPort {

    private final MovieJpaRepository jpaRepository;
    private final MovieMapper mapper;

    @Override
    public Movie create(Movie movie) {
        MovieEntity entity = mapper.toEntity(movie);
        MovieEntity entitySaved = jpaRepository.save(entity);

        return mapper.toDomain(entitySaved);
    }

    @Override
    public Optional<Movie> findById(Long id) {
        return jpaRepository.findById(id).map(mapper::toDomain);
    }

    @Override
    public List<Movie> findAll() {
        return jpaRepository.findAll().stream().map(mapper::toDomain).toList();
    }

    @Override
    public Movie modify(Movie movie) {
        MovieEntity entity = mapper.toEntity(movie);
        MovieEntity entityModified = jpaRepository.save(entity);

        return mapper.toDomain(entityModified);
    }

    @Override
    public void delete(Movie movie) {
        MovieEntity entity = mapper.toEntity(movie);
        jpaRepository.delete(entity);
    }

}
