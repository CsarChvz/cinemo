package com.cinemo.api.infrastructure.config;

import com.cinemo.api.application.service.StateService;
import com.cinemo.api.domain.ports.out.StateRepositoryPort;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StateConfig {

    @Bean
    public StateService stateService(StateRepositoryPort stateRepositoryPort) {
        return new StateService(stateRepositoryPort);
    }
}