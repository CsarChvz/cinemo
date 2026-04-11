package com.cinemo.api.domain.ports.in.booking;

import java.math.BigDecimal;

import com.cinemo.api.domain.Booking;

public interface BookingUseCase {

  Booking create(Booking booking);

  BigDecimal calculateTotalPrice(int cantidadAsientos, BigDecimal precioUnitario);

  void cancelBooking(Booking booking);

  Booking getById(Long bookingId);
}
