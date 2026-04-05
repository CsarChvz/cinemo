package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cinemo.api.application.service.MunicipalityService;
import com.cinemo.api.domain.ports.out.MunicipalityRepositoryPort;

@Configuration
public class MunicipalityConfig {



  @Bean
  public MunicipalityService municipalityService(MunicipalityRepositoryPort municipalityRepositoryPort) {
    return new MunicipalityService(municipalityRepositoryPort);
  }
}
