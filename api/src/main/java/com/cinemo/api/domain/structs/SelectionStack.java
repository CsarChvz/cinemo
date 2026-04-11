package com.cinemo.api.domain.structs;

import java.util.ArrayList;
import java.util.List;

public class SelectionStack {
    private static class Nodo {
        Long seatId;
        Nodo siguiente;
        Nodo(Long seatId) { this.seatId = seatId; }
    }

    private Nodo tope;
    private int tamanio;

    public void push(Long seatId) {
        Nodo nuevo = new Nodo(seatId);
        nuevo.siguiente = tope;
        tope = nuevo;
        tamanio++;
    }

    public Long pop() {
        if (isEmpty()) throw new RuntimeException("No hay asientos seleccionados");
        Long seatId = tope.seatId;
        tope = tope.siguiente;
        tamanio--;
        return seatId;
    }

    public Long peek() {
        if (isEmpty()) throw new RuntimeException("Pila vacía");
        return tope.seatId;
    }

    public boolean isEmpty() { return tope == null; }
    public int getTamanio() { return tamanio; }

    public List<Long> toList() {
        List<Long> result = new ArrayList<>();
        Nodo actual = tope;
        while (actual != null) {
            result.add(actual.seatId);
            actual = actual.siguiente;
        }
        return result;
    }

    public boolean remove(Long seatId) {
        if (isEmpty())
            return false;

        // Caso 1: El asiento a quitar es justo el que está en el tope (hasta arriba)
        if (tope.seatId.equals(seatId)) {
            tope = tope.siguiente;
            tamanio--;
            return true;
        }

        // Caso 2: El asiento está en medio o hasta abajo de la pila
        Nodo actual = tope.siguiente;
        Nodo anterior = tope;

        while (actual != null) {
            if (actual.seatId.equals(seatId)) {
                // "Desconectamos" el nodo actual saltándolo
                anterior.siguiente = actual.siguiente;
                tamanio--;
                return true;
            }
            anterior = actual;
            actual = actual.siguiente;
        }

        // No se encontró el asiento en la pila
        return false;
    }
}
