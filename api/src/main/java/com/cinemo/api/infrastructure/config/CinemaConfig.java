package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cinemo.api.application.service.CinemaService;
import com.cinemo.api.domain.ports.out.CinemaRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.adapter.CinemaJpaAdapter;

@Configuration
public class CinemaConfig {

    @Bean
    public CinemaRepositoryPort cinemaRepositoryPort(CinemaJpaAdapter cinemaJpaAdapter){
        return cinemaJpaAdapter;
    }

    @Bean
    public CinemaService cinemaService(CinemaRepositoryPort cinemaRepositoryPort){
        return new CinemaService(cinemaRepositoryPort);
    }

}
