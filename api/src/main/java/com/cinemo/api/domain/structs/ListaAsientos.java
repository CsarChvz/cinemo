package com.cinemo.api.domain.structs;

import java.util.ArrayList;
import java.util.List;

import com.cinemo.api.domain.Seat;

public class ListaAsientos {

    private NodoSeat cabeza;
    private int tamanio;

    // Inserta ordenado por rowLetter + seatNumber
    public void insertar(Seat seat) {
        NodoSeat nuevo = new NodoSeat(seat);

        if (cabeza == null) {
            cabeza = nuevo;
            tamanio++;
            return;
        }

        // Buscar posición correcta
        NodoSeat actual = cabeza;
        NodoSeat anterior = null;

        while (actual != null && comparar(actual.dato, seat) < 0) {
            anterior = actual;
            actual = actual.siguiente;
        }

        if (anterior == null) {
            nuevo.siguiente = cabeza;
            cabeza = nuevo;
        } else {
            nuevo.siguiente = actual;
            anterior.siguiente = nuevo;
        }
        tamanio++;
    }

    private int comparar(Seat a, Seat b) {
        int filaComp = a.getRowLetter().compareTo(b.getRowLetter());
        if (filaComp != 0)
            return filaComp;
        return Integer.compare(a.getSeatNumber(), b.getSeatNumber());
    }

    public List<Seat> toList() {
        List<Seat> result = new ArrayList<>();
        NodoSeat actual = cabeza;
        while (actual != null) {
            result.add(actual.dato);
            actual = actual.siguiente;
        }
        return result;
    }

    public NodoSeat getCabeza() {
        return cabeza;
    }

    public int getTamanio() {
        return tamanio;
    }
}