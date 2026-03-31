package com.cinemo.api.application.exceptions;

public class DuplicateStateExceptioni extends RuntimeException{
    public DuplicateStateExceptioni(String name) {
        super("El estado '" + name + "' ya existe. No se permiten duplicados.");
    }
}
