package com.cinemo.api.domain.ports.in.user;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.User;

public interface RetriveUserUseCase {
  List<User> getUsers();

  User getUser(Long id);

  Optional<User> getByUsername(String username);
}