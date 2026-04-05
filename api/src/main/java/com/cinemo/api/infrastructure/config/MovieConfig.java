package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cinemo.api.application.service.MovieService;
import com.cinemo.api.domain.ports.out.MovieRepositoryPort;

@Configuration
public class MovieConfig {

    @Bean
    public MovieService movieService(MovieRepositoryPort movieRepositoryPort){
        return new MovieService(movieRepositoryPort);
    }

}
