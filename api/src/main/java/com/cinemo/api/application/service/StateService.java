package com.cinemo.api.application.service;

import java.util.List;

import com.cinemo.api.application.exceptions.DuplicateStateExceptioni;
import com.cinemo.api.domain.State;
import com.cinemo.api.domain.ports.in.CreateStateUseCase;
import com.cinemo.api.domain.ports.in.RetrieveStateUseCase;
import com.cinemo.api.domain.ports.out.StateRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class StateService implements CreateStateUseCase, RetrieveStateUseCase {

    private final StateRepositoryPort stateRepositoryPort;

    @Override
    public State createState(State state) {
        stateRepositoryPort.findByName(state.getName()).ifPresent(
            existing -> {
                throw new DuplicateStateExceptioni(state.getName());
            }
        );

        if(!state.hasValidName()){
            throw new IllegalArgumentException();
        }

        return stateRepositoryPort.saveState(state);
    }

    @Override
    public List<State> getStates() {
        return stateRepositoryPort.findAll();
    }
    

}
