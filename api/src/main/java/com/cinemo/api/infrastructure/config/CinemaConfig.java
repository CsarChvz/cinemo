package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cinemo.api.application.service.CinemaService;
import com.cinemo.api.domain.ports.out.CinemaRepositoryPort;

@Configuration
public class CinemaConfig {

    @Bean
    public CinemaService cinemaService(CinemaRepositoryPort cinemaRepositoryPort){
        return new CinemaService(cinemaRepositoryPort);
    }

}
