package com.cinemo.api.infrastructure.persistence.jpa.adapter;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.cinemo.api.domain.State;
import com.cinemo.api.domain.ports.out.StateRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.entity.StateEntity;
import com.cinemo.api.infrastructure.persistence.jpa.mapper.StateMapper;
import com.cinemo.api.infrastructure.persistence.jpa.repository.StateJpaRepository;

import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class StateJpaAdapter implements StateRepositoryPort{

    private final StateJpaRepository jpaRepository;
    private final StateMapper mapper;

    @Override
    public State saveState(State state) {
        StateEntity entity = mapper.toEntity(state);
        StateEntity savedEntity = jpaRepository.save(entity);

        return mapper.toDomain(savedEntity);
    }

    @Override
    public Optional<State> findByName(String name) {
        return jpaRepository.findByName(name).map(mapper::toDomain);
    }

}
