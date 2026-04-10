package com.cinemo.api.domain.ports.in.booking;

import com.cinemo.api.domain.Booking;

public interface BookingUseCase {

  Booking create(Booking booking);
}
