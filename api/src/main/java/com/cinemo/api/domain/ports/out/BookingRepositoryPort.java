package com.cinemo.api.domain.ports.out;

import com.cinemo.api.domain.Booking;

public interface BookingRepositoryPort {
  Booking save(Booking booking);
}
