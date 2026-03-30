package com.cinemo.api.application;

import com.cinemo.api.application.exceptions.DuplicateUserException;
import com.cinemo.api.domain.User;
import com.cinemo.api.domain.ports.in.CreateUserUseCase;
import com.cinemo.api.domain.ports.out.UserRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserService implements CreateUserUseCase {
    private final UserRepositoryPort userRepositoryPort;

    @Override
    public User creatUser(User user) {

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
}
