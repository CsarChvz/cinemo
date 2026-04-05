package com.cinemo.api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI(){
        return new OpenAPI().info(
            new Info()
            .title("Cinemo - API")
            .version("1.0")
            .description("Cinemo API - Arquitectura Hexagonal")
            .contact(new Contact()
                .name("César Chávez")
                .name("cesarconfigs")
            )
        );
    }
}
