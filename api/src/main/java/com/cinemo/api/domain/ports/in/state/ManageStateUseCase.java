package com.cinemo.api.domain.ports.in.state;


import com.cinemo.api.domain.State;

public interface ManageStateUseCase {
    State modifiedState(State state);

    void removeState(State state);
}
