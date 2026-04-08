package com.cinemo.api.domain.ports.in.auth;

import com.cinemo.api.domain.User;

public interface RegisterUserUseCase {
  User register(User user);

}
