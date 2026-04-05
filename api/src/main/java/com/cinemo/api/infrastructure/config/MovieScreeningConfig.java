package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cinemo.api.application.service.MovieScreeningService;
import com.cinemo.api.domain.ports.out.MovieScreeningRepositoryPort;

@Configuration
public class MovieScreeningConfig {

    @Bean
    public MovieScreeningService movieScreeningService(MovieScreeningRepositoryPort repositoryPort){
        return new MovieScreeningService(repositoryPort);
    }
}
