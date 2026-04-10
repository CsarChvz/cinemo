package com.cinemo.api.domain.structs;

import com.cinemo.api.domain.Booking;

public class ReservationQueue {

  private static class Nodo {
    Booking dato;
    Nodo siguiente;

    Nodo(Booking b) {
      this.dato = b;
    }
  }

  private Nodo frente;
  private Nodo fin;
  private int tamanio;

  public void encolar(Booking booking) {
    Nodo nuevo = new Nodo(booking);

    if (frente == null) {
      frente = fin = nuevo;
      tamanio++;
      return;
    }

    // Normal va al final
    fin.siguiente = nuevo;
    fin = nuevo;
    tamanio++;
  }

  public Booking desencolar() {
    if (isEmpty())
      throw new RuntimeException("Cola vacía");
    Booking b = frente.dato;
    frente = frente.siguiente;
    if (frente == null)
      fin = null;
    tamanio--;
    return b;
  }

  public boolean isEmpty() {
    return frente == null;
  }

  public int getTamanio() {
    return tamanio;
  }
}