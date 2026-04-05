package com.cinemo.api.application.structures;

import lombok.Data;

@Data
public class NodoDoble<T> {
    private T contenido;
    private NodoDoble<T> siguiente;
    private NodoDoble<T> anterior;
}