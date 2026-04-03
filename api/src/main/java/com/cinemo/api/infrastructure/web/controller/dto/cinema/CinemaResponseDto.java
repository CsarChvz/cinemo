package com.cinemo.api.infrastructure.web.controller.dto.cinema;

import com.cinemo.api.infrastructure.web.controller.dto.municipality.MunicipalityResponseDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CinemaResponseDto {
    private Long id;
    private String name;
    private String address;
    private MunicipalityResponseDto municipality;
}
