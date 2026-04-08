package com.cinemo.api.domain.ports.out;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.User;

public interface UserRepositoryPort {
    User save(User user);

    Optional<User> findByName(String name);

    Optional<User> findByUsername(String username);

    List<User> findAll();

    Optional<User> findById(Long id);
}
