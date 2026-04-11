package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cinemo.api.application.service.SeatStatusService;
import com.cinemo.api.domain.ports.out.SeatStatusRepositoryPort;

@Configuration
public class SeatStatusConfig {
    @Bean 
    public SeatStatusService seatStatusService(SeatStatusRepositoryPort seatStatusRepositoryPort){
        return new SeatStatusService(seatStatusRepositoryPort);
    }
}
