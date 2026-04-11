package com.cinemo.api.application.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.cinemo.api.domain.Booking;
import com.cinemo.api.domain.ports.in.booking.BookingUseCase;
import com.cinemo.api.domain.ports.in.seat_status.SeatStatusUseCase;
import com.cinemo.api.domain.ports.out.BookingRepositoryPort;
import com.cinemo.api.domain.structs.ReservationQueue;
import com.cinemo.api.domain.structs.RollbackStack;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class BookingService implements BookingUseCase {

  private final BookingRepositoryPort bookingRepositoryPort;
  private final SeatStatusUseCase seatStatusUseCase;

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

      // 2. Bloquear cada asiento uno por uno
      for (Long seatId : booking.getSeatStatusIds()) {
        System.out.println("💺 [SEAT] Intentando seleccionar asiento ID: " + seatId);

        seatStatusUseCase.selectSeat(booking.getFunctionId(), seatId, booking.getUserId());

        // Agregamos al stack de rollback por si algo falla después
        rollbackStack.push(
            () -> liberarAsiento(booking.getFunctionId(), seatId, booking.getUserId()),
            "Liberar asiento " + seatId);
      }

      // 3. Persistir el Booking
      booking.setStatus("CONFIRMED");
      booking.setCreatedAt(LocalDateTime.now());

      Booking bookingSaved = bookingRepositoryPort.save(booking);
      System.out.println("✅ [SUCCESS] Booking guardado con ID: " + bookingSaved.getId());

      // Si el guardado falla o queremos revertir el booking después
      rollbackStack.push(
          () -> bookingRepositoryPort.updateStatus(bookingSaved.getId(), "CANCELLED"),
          "Cancelar booking ID: " + bookingSaved.getId());

      return bookingSaved;

    } catch (Exception e) {
      System.err.println("🔥 [ROLLBACK] Error detectado: " + e.getMessage());
      System.err.println("🛠️ [ROLLBACK] Ejecutando compensaciones del RollbackStack...");

      rollbackStack.ejecutarTodo(); // LIFO: Libera el último asiento primero

      throw new RuntimeException("Booking fallido. El sistema revirtió los cambios: " + e.getMessage());
    }
  }

  private void liberarAsiento(Long functionId, Long seatId, Long userId) {
    seatStatusUseCase.releaseSeat(functionId, seatId);
    System.out.println("⏪ [REVERT] Asiento " + seatId + " vuelto a poner como AVAILABLE.");
  }

  private BigDecimal obtenerPrecioBase(Long functionId) {
    // En un caso real, esto vendría de
    // movieScreeningRepository.findById(functionId).getPrice()
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