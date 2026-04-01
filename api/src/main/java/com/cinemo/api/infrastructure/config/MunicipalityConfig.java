package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cinemo.api.application.service.MunicipalityService;
import com.cinemo.api.domain.ports.out.MunicipalityRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.adapter.MunicipalityJpaAdapter;

@Configuration
public class MunicipalityConfig {

  @Bean
  public MunicipalityRepositoryPort municipalityRepositoryPort(MunicipalityJpaAdapter municipalityJpaAdapter) {
    return municipalityJpaAdapter;
  }

  @Bean
  public MunicipalityService municipalityService(MunicipalityRepositoryPort municipalityRepositoryPort) {
    return new MunicipalityService(municipalityRepositoryPort);
  }
}
