package com.cinemo.api.domain.ports.in.state;

import com.cinemo.api.domain.State;

public interface CreateStateUseCase {
    State createState(State state);
}
