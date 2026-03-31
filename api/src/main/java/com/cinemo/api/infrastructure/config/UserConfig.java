package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cinemo.api.application.service.UserService;
import com.cinemo.api.domain.ports.out.UserRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.adapter.UserJpaAdapter;

@Configuration
public class UserConfig {

    @Bean
    public UserRepositoryPort userRepositoryPort(UserJpaAdapter userJpaAdapter) {
        return userJpaAdapter;
    }

    @Bean
    public UserService userService(UserRepositoryPort userRepositoryPort) {
        return new UserService(userRepositoryPort);
    }
}