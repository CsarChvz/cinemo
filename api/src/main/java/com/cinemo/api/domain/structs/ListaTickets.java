package com.cinemo.api.domain.structs;

import java.util.ArrayList;
import java.util.List;

import com.cinemo.api.domain.Ticket;

public class ListaTickets {

    private NodoTicket cabeza;
    private NodoTicket cola;
    private int tamanio;

    public void agregar(Ticket ticket) {
        NodoTicket nuevo = new NodoTicket(ticket);
        if (cabeza == null) {
            cabeza = cola = nuevo;
        } else {
            cola.siguiente = nuevo;
            cola = nuevo;
        }
        tamanio++;
    }

    public List<Ticket> toList() {
        List<Ticket> result = new ArrayList<>();
        NodoTicket actual = cabeza;
        while (actual != null) {
            result.add(actual.dato);
            actual = actual.siguiente;
        }
        return result;
    }

    public int getTamanio() {
        return tamanio;
    }

    public boolean isEmpty() {
        return cabeza == null;
    }
}