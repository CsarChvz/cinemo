package com.cinemo.api.application.exceptions;

public class DuplicateUserException extends RuntimeException {
    public DuplicateUserException(String name) {
        super("El hábito '" + name + "' ya existe. No se permiten duplicados.");
    }
}