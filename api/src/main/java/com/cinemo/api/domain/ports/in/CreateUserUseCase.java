package com.cinemo.api.domain.ports.in;

import com.cinemo.api.domain.User;

public interface CreateUserUseCase {
    User createUser(User user);
}
