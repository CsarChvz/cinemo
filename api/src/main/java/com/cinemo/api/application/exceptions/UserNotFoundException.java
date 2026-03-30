package com.cinemo.api.application.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("No se encontró el usuario con el ID: " + id);
    }
}