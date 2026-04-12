package com.cinemo.api.infrastructure.web.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.Booking;
import com.cinemo.api.domain.ports.in.booking.BookingUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.booking.BookingDtoMapper;
import com.cinemo.api.infrastructure.web.controller.dto.booking.BookingRequestDto;
import com.cinemo.api.infrastructure.web.controller.dto.booking.BookingResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingUseCase bookingUseCase;
    private final BookingDtoMapper dtoMapper;

    @PostMapping
    public ResponseEntity<BookingResponseDto> create(@RequestBody BookingRequestDto req) {
        Booking booking = dtoMapper.toDomain(req);
        
        Booking saved = bookingUseCase.create(booking);
        
        return ResponseEntity.ok(dtoMapper.toResponse(saved));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancel(@PathVariable Long id) {
        Booking booking = bookingUseCase.getById(id);

        if (booking == null) {
            return ResponseEntity.notFound().build();
        }

        bookingUseCase.cancelBooking(booking);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getByUser(@RequestParam Long userId) {
        return ResponseEntity.ok(bookingUseCase.getByUser(userId));
    }
}
