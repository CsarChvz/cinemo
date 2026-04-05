package com.cinemo.api.application.exceptions;

public class DuplicateMunicipalityException extends RuntimeException {
    public DuplicateMunicipalityException(String name) {
        super("El estado '" + name + "' ya existe. No se permiten duplicados.");
    }
}