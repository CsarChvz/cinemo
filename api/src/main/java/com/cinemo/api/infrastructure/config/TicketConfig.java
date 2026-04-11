package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cinemo.api.application.service.TicketService;
import com.cinemo.api.domain.ports.out.TicketRepositoryPort;

@Configuration
public class TicketConfig {
    @Bean
    TicketService ticketService(TicketRepositoryPort ticketRepositoryPort){
        return new TicketService(ticketRepositoryPort);
    }
}
