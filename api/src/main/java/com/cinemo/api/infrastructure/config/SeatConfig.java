package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cinemo.api.application.service.SeatService;
import com.cinemo.api.domain.ports.out.SeatRepositoryPort;

@Configuration
public class SeatConfig {
    @Bean
    public SeatService seatService(SeatRepositoryPort seatRepositoryPort){
        return new SeatService(seatRepositoryPort);
    }
}
