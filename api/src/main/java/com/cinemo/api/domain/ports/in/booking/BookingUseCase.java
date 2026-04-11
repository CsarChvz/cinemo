package com.cinemo.api.domain.ports.in.booking;

import java.math.BigDecimal;
import java.util.List;

import com.cinemo.api.domain.Booking;

public interface BookingUseCase {

  Booking create(Booking booking);

  BigDecimal calculateTotalPrice(int cantidadAsientos, BigDecimal precioUnitario);

  void cancelBooking(Booking booking);

  Booking getById(Long bookingId);

  List<Booking> getByUser(Long userId);
}
