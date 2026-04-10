package com.cinemo.api.application.service;

import com.cinemo.api.domain.Booking;
import com.cinemo.api.domain.ports.in.booking.BookingUseCase;
import com.cinemo.api.domain.ports.out.BookingRepositoryPort;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class BookingService implements BookingUseCase {
  private final BookingRepositoryPort bookingRepositoryPort;

  @Override
  public Booking create(Booking booking) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'create'");
  }
}
