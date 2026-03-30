package com.cinemo.api.domain.ports.out;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.User;

public interface UserRepositoryPort {
    User saveUser(User user);

    Optional<User> findByName(String name);

    List<User> findAll();

    Optional<User> findById(Long id);
}
