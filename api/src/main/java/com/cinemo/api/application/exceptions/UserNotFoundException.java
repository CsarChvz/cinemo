package com.cinemo.api.application.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String id) {
        super("No se encontró el hábito con el ID: " + id);
    }
}