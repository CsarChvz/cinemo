package com.cinemo.api.domain.ports.out;


import java.util.List;

import com.cinemo.api.domain.Booking;

public interface BookingRepositoryPort {
  Booking save(Booking booking);

  void updateStatus(Long bookId, String status);

  Booking findById(Long bookId);

  List<Booking> findByUserId(Long userId);
}
