package com.cinemo.api.domain.ports.in.user;

import java.util.List;

import com.cinemo.api.domain.User;

public interface RetriveUsersUseCase {
  List<User> getUsers();

  User getUser(Long id);
}