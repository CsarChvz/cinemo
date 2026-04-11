package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cinemo.api.application.service.BookingService;
import com.cinemo.api.domain.ports.in.seat_status.SeatStatusUseCase;
import com.cinemo.api.domain.ports.out.BookingRepositoryPort;

@Configuration
public class BookingConfig {
    
    @Bean
    public BookingService bookingService(BookingRepositoryPort bookingRepositoryPort, SeatStatusUseCase seatStatusUseCase){
        return new BookingService(bookingRepositoryPort, seatStatusUseCase);
    }
}
