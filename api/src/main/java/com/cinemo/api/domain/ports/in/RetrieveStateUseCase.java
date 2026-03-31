package com.cinemo.api.domain.ports.in;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.State;

public interface RetrieveStateUseCase {
    List<State> getStates();

    List<State> getMemoryStates();

    Optional<State> getByCode(String code);

    Optional<State> getById(Long id);

}
