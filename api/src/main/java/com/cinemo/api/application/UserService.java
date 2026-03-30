package com.cinemo.api.application;

import java.util.List;

import com.cinemo.api.application.exceptions.DuplicateUserException;
import com.cinemo.api.application.exceptions.UserNotFoundException;
import com.cinemo.api.domain.User;
import com.cinemo.api.domain.ports.in.CreateUserUseCase;
import com.cinemo.api.domain.ports.in.RetriveUsersUseCase;
import com.cinemo.api.domain.ports.out.UserRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserService implements CreateUserUseCase, RetriveUsersUseCase {
    private final UserRepositoryPort userRepositoryPort;

    @Override
    public User createUser(User user) {

        userRepositoryPort.findByName(user.getName()).ifPresent(
            existing -> {
                throw new DuplicateUserException(user.getName());
            }
        );

        if(!user.hasValidName()){
            throw new IllegalArgumentException();
        }
        return userRepositoryPort.saveUser(user);
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
}
