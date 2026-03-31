package com.cinemo.api.domain.ports.out;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.State;

public interface StateRepositoryPort {
    State saveState(State state);

    Optional<State> findByName(String name);

    Optional<State> findById(Long id);

    List<State> findAll();

    State updateState(State state);
}
