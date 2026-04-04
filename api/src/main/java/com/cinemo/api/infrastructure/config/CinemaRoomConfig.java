package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cinemo.api.application.service.CinemaRoomService;
import com.cinemo.api.domain.ports.out.CinemaRoomRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.adapter.CinemaRoomJpaAdapter;

@Configuration
public class CinemaRoomConfig {
    @Bean
    public CinemaRoomRepositoryPort cinemaRoomRepositoryPort(CinemaRoomJpaAdapter cinemaRoomJpaAdapter){
        return cinemaRoomJpaAdapter;
    }

    @Bean
    public CinemaRoomService cinemaRoomService(CinemaRoomRepositoryPort cinemaRoomRepositoryPort){
        return new CinemaRoomService(cinemaRoomRepositoryPort);
    }
}
