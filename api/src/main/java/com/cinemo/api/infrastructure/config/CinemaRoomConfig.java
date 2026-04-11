package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cinemo.api.application.service.CinemaRoomService;
import com.cinemo.api.domain.ports.in.seat.ManageSeatUseCase;
import com.cinemo.api.domain.ports.out.CinemaRoomRepositoryPort;

@Configuration
public class CinemaRoomConfig {
    @Bean
    public CinemaRoomService cinemaRoomService(CinemaRoomRepositoryPort cinemaRoomRepositoryPort,
            ManageSeatUseCase manageSeatUseCase) {
        return new CinemaRoomService(cinemaRoomRepositoryPort, manageSeatUseCase);
    }
}
