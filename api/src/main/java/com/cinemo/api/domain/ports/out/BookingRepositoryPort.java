package com.cinemo.api.domain.ports.out;


import com.cinemo.api.domain.Booking;

public interface BookingRepositoryPort {
  Booking save(Booking booking);

  void updateStatus(Long bookId, String status);

  Booking findById(Long bookId);

}
