package com.cinemo.api.application.structures;

import lombok.Data;

@Data
public class NodoSimple<T> {
    private T contenido;
    private NodoSimple<T> siguiente;

}