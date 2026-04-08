package com.cinemo.api.infrastructure.web.controller.dto.cinema;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SimpleCinemaResponseDto {
    private Long id;
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private Long municipalityId;
}
