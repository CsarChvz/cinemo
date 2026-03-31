package com.cinemo.api.infrastructure.config;

import com.cinemo.api.application.service.StateService;
import com.cinemo.api.domain.ports.out.StateRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.adapter.StateJpaAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StateConfig {

    @Bean
    public StateRepositoryPort stateRepositoryPort(StateJpaAdapter stateJpaAdapter) {
        return stateJpaAdapter;
    }

    @Bean
    public StateService stateService(StateRepositoryPort stateRepositoryPort) {
        return new StateService(stateRepositoryPort);
    }
}