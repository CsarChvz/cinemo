package com.cinemo.api.application.service;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.application.exceptions.DuplicateUserException;
import com.cinemo.api.application.exceptions.UserNotFoundException;
import com.cinemo.api.domain.User;
import com.cinemo.api.domain.ports.in.user.CreateUserUseCase;
import com.cinemo.api.domain.ports.in.user.RetriveUserUseCase;
import com.cinemo.api.domain.ports.out.UserRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserService implements CreateUserUseCase, RetriveUserUseCase {
    private final UserRepositoryPort userRepositoryPort;

    @Override
    public User createUser(User user) {

        userRepositoryPort.findByName(user.getName()).ifPresent(
                existing -> {
                    throw new DuplicateUserException(user.getName());
                });

        if (!user.hasValidName()) {
            throw new IllegalArgumentException();
        }
        return userRepositoryPort.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepositoryPort.findAll();
    }

    @Override
    public User getUser(Long id) {
        return userRepositoryPort.findById(id).orElseThrow(
                () -> new UserNotFoundException(id));
    }

    @Override
    public Optional<User> getByUsername(String username) {
        return userRepositoryPort.findByUsername(username);
    }
}
