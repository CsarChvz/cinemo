package com.cinemo.api.domain.ports.in.user;

import com.cinemo.api.domain.User;

public interface CreateUserUseCase {
  User createUser(User user);
}