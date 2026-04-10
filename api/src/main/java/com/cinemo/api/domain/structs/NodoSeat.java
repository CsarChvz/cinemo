package com.cinemo.api.domain.structs;

import com.cinemo.api.domain.Seat;

public class NodoSeat {
    public Seat dato;
    public NodoSeat siguiente;

    public NodoSeat(Seat seat) {
        this.dato = seat;
    }
}