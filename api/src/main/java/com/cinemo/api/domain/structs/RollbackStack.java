package com.cinemo.api.domain.structs;

public class RollbackStack {

  private static class Nodo {
    Runnable operacion;
    String descripcion;
    Nodo siguiente;

    Nodo(Runnable op, String desc) {
      this.operacion = op;
      this.descripcion = desc;
    }
  }

  private Nodo tope;

  public void push(Runnable operacion, String descripcion) {
    Nodo nuevo = new Nodo(operacion, descripcion);
    nuevo.siguiente = tope;
    tope = nuevo;
  }

  public void pop() {
    if (tope == null)
      return;
    tope.operacion.run();
    tope = tope.siguiente;
  }

  public void ejecutarTodo() {
    while (tope != null)
      pop();
  }

  public boolean isEmpty() {
    return tope == null;
  }
}
