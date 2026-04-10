package com.cinemo.api.domain.structs;

public class WaitingQueue {
    private static class Nodo {
        Long userId;
        Nodo siguiente;

        Nodo(Long userId) {
            this.userId = userId;
        }
    }

    private Nodo frente;
    private Nodo fin;
    private int tamanio;

    public void encolar(Long userId) {
        Nodo nuevo = new Nodo(userId);
        if (fin == null) {
            frente = fin = nuevo;
        } else {
            fin.siguiente = nuevo;
            fin = nuevo;
        }
        tamanio++;
    }

    public Long desencolar() {
        if (isEmpty())
            throw new RuntimeException("Cola vacía");
        Long userId = frente.userId;
        frente = frente.siguiente;
        if (frente == null)
            fin = null;
        tamanio--;
        return userId;
    }

    public int getPosicion(Long userId) {
        int pos = 1;
        Nodo actual = frente;
        while (actual != null) {
            if (actual.userId.equals(userId))
                return pos;
            actual = actual.siguiente;
            pos++;
        }
        return -1;
    }

    public boolean isEmpty() {
        return frente == null;
    }

    public int getTamanio() {
        return tamanio;
    }
}
