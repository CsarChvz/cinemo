package com.cinemo.api.application.service;

import java.util.List;
import java.util.Optional;

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

    // @TODO: Implementar algoritmo de Ordenamiento
    @Override
    public List<State> getStates() {

        return stateRepositoryPort.findAll();
    }


    // @TODD: Usar la busqueda binaria
    @Override
    public Optional<State> getByCode(String code) {
        List<State> states = stateRepositoryPort.findAll();
        return searchBinary(states, code, 0, states.size() - 1);    
    }

    private Optional<State> searchBinary(List<State> states, String code, int low, int high) {
        if (low > high)
            return Optional.empty(); // Caso base

        int mid = (low + high) / 2;
        int compare = states.get(mid).getCode().compareTo(code);

        if (compare == 0)
            return Optional.of(states.get(mid)); // Encontramos y devolvemos

        if (compare < 0)
            return searchBinary(states, code, mid + 1, high); // Recorremos la busqueda a la derecha mid ->

        return searchBinary(states, code, low, mid - 1); // Recorremos la busqueda a la izquierda <- mid

    }

}
