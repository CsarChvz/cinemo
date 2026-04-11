package com.cinemo.api.domain.structs;
import com.cinemo.api.domain.Ticket;

public class NodoTicket {
    public Ticket dato;
    public NodoTicket siguiente;

    public NodoTicket(Ticket ticket) {
        this.dato = ticket;
    }
}

