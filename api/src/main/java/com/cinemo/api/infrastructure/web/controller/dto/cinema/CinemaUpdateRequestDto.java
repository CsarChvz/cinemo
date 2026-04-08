package com.cinemo.api.infrastructure.web.controller.dto.cinema;

import lombok.Data;

@Data
public class CinemaUpdateRequestDto {

    private String name;

    private String address;

    private Double latitude;

    private Double longitude;

    private Long municipalityId;
}
