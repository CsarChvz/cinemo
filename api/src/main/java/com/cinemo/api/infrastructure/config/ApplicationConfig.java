package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cinemo.api.application.service.StateService;
import com.cinemo.api.application.service.UserService;
import com.cinemo.api.domain.ports.in.CreateStateUseCase;
import com.cinemo.api.domain.ports.in.CreateUserUseCase;
import com.cinemo.api.domain.ports.in.RetriveUsersUseCase;
import com.cinemo.api.domain.ports.out.StateRepositoryPort;
import com.cinemo.api.domain.ports.out.UserRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.adapter.StateJpaAdapter;
import com.cinemo.api.infrastructure.persistence.jpa.adapter.UserJpaAdapter;

@Configuration
public class ApplicationConfig {
    @Bean
    public UserRepositoryPort userRepositoryPort(UserJpaAdapter userJpaAdapter){
        return userJpaAdapter;
    }

    @Bean CreateUserUseCase createUserUseCase(UserRepositoryPort userRepositoryPort){
        return new UserService(userRepositoryPort);
    }

    @Bean RetriveUsersUseCase retriveUsersUseCase(UserRepositoryPort userRepositoryPort){
        return new UserService(userRepositoryPort);
    }

    @Bean
    public StateRepositoryPort stateRepositoryPort(StateJpaAdapter stateJpaAdapter) {
        return stateJpaAdapter;
    }

    @Bean
    CreateStateUseCase createStateUseCase(StateRepositoryPort stateRepositoryPort) {
        return new StateService(stateRepositoryPort);
    }
    // Inyectamos StateJpaAdapter --> StateRepositoryPort --> StateUseCase
}
