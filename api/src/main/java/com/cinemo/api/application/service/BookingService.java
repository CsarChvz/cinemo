package com.cinemo.api.application.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.cinemo.api.domain.Booking;
import com.cinemo.api.domain.ports.in.booking.BookingUseCase;
import com.cinemo.api.domain.ports.in.seat_status.SeatStatusUseCase;
import com.cinemo.api.domain.ports.in.ticket.TicketUseCase;
import com.cinemo.api.domain.ports.out.BookingRepositoryPort;
import com.cinemo.api.domain.structs.ReservationQueue;
import com.cinemo.api.domain.structs.RollbackStack;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class BookingService implements BookingUseCase {

  private final BookingRepositoryPort bookingRepositoryPort;
  private final SeatStatusUseCase seatStatusUseCase;
  private final TicketUseCase ticketUseCase;

  // Estructuras de datos personalizadas
  private final ReservationQueue reservationQueue = new ReservationQueue();

  @Override
  public Booking create(Booking booking) {
    System.out.println("\n🎟️ [QUEUE] Encolando nueva petición de reserva para usuario: " + booking.getUserId());
    booking.setStatus("PENDING");
    reservationQueue.encolar(booking);

    return procesarSiguiente();
  }

  private Booking procesarSiguiente() {
    if (reservationQueue.isEmpty())
      return null;

    Booking booking = reservationQueue.desencolar();
    RollbackStack rollbackStack = new RollbackStack();

    System.out.println("🚀 [PROCESS] Procesando reserva de la cola...");

    try {
      // 1. Calcular precio total primero (Precio base * cantidad de IDs)
      BigDecimal precioBase = obtenerPrecioBase(booking.getFunctionId());
      BigDecimal total = calculateTotalPrice(booking.getSeatStatusIds().size(), precioBase);
      booking.setTotalPrice(total);

      System.out
          .println("💰 [PRICE] Precio calculado: " + total + " (" + booking.getSeatStatusIds().size() + " asientos)");

      // 2. Confirmar cada asiento uno por uno
      for (Long seatId : booking.getSeatStatusIds()) {
        System.out.println("💺 [SEAT] Confirmando compra definitiva del asiento ID: " + seatId);

        // 🔥 CAMBIO CLAVE: Confirmamos la compra, pasándolo a OCCUPIED
        seatStatusUseCase.confirmSeatPurchase(booking.getFunctionId(), seatId, booking.getUserId());

        // Agregamos al stack de rollback por si el proceso de Booking falla más
        // adelante
        rollbackStack.push(
            () -> rollbackAsientoAReservado(booking.getFunctionId(), seatId, booking.getUserId()),
            "Revertir asiento " + seatId + " a estado temporal (RESERVED_TEMP)");
      }

      booking.setStatus("PAID");
      booking.setCreatedAt(LocalDateTime.now());

      Booking bookingSaved = bookingRepositoryPort.save(booking);
      System.out.println("✅ [SUCCESS] Booking guardado con ID: " + bookingSaved.getId());

      BigDecimal precioPorAsiento = precioBase;
      ticketUseCase.castTickets(bookingSaved.getId(), bookingSaved.getSeatStatusIds(), precioPorAsiento);

      System.out.println("🎟️ [TICKETS] Tickets generados exitosamente para el booking: " + bookingSaved.getId());
      // Si se quisiera revertir el booking DESPUÉS de guardado (por algún error
      // externo)
      rollbackStack.push(
          () -> bookingRepositoryPort.updateStatus(bookingSaved.getId(), "CANCELLED"),
          "Cancelar booking ID: " + bookingSaved.getId());

      return bookingSaved;

    } catch (Exception e) {
      System.err.println("🔥 [ROLLBACK] Error detectado: " + e.getMessage());
      System.err.println("🛠️ [ROLLBACK] Ejecutando compensaciones del RollbackStack...");

      rollbackStack.ejecutarTodo(); // LIFO: Revierte los asientos en orden inverso

      throw new RuntimeException("Booking fallido. El sistema revirtió los cambios: " + e.getMessage());
    }
  }

  // Método privado para el Rollback
  private void rollbackAsientoAReservado(Long functionId, Long seatId, Long userId) {
    seatStatusUseCase.revertToReservedTemp(functionId, seatId, userId);
    System.out.println("⏪ [REVERT] Asiento " + seatId + " devuelto a RESERVED_TEMP tras fallo en la compra.");
  }

  private BigDecimal obtenerPrecioBase(Long functionId) {
    // En un caso real, esto vendría de movieScreeningRepository
    return new BigDecimal("120.00");
  }

  @Override
  public BigDecimal calculateTotalPrice(int cantidadAsientos, BigDecimal precioUnitario) {
    if (cantidadAsientos <= 0)
      return BigDecimal.ZERO;
    return precioUnitario.multiply(new BigDecimal(cantidadAsientos));
  }

  @Override
  public void cancelBooking(Booking booking) {
    bookingRepositoryPort.updateStatus(booking.getId(), "CANCELLED");
    // Al cancelar un booking (ej. devolución), liberas los asientos a los de la
    // cola
    booking.getSeatStatusIds().forEach(seatId -> seatStatusUseCase.notifyNext(booking.getFunctionId(), seatId));
  }

  @Override
  public Booking getById(Long bookingId) {
    return bookingRepositoryPort.findById(bookingId);
  }

  @Override
  public List<Booking> getByUser(Long userId) {
    return bookingRepositoryPort.findByUserId(userId);
  }
}