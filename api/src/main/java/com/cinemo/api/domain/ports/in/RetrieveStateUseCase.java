package com.cinemo.api.domain.ports.in;

import java.util.List;

import com.cinemo.api.domain.State;

public interface RetrieveStateUseCase {
    List<State> getStates();
}
