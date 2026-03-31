package com.cinemo.api.domain.ports.out;

import java.util.Optional;

import com.cinemo.api.domain.State;

public interface StateRepositoryPort {
    State saveState(State state);

    Optional<State> findByName(String name);
}
