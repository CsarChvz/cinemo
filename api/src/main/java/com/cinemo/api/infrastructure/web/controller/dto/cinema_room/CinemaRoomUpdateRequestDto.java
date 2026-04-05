package com.cinemo.api.infrastructure.web.controller.dto.cinema_room;

import lombok.Data;

@Data
public class CinemaRoomUpdateRequestDto {
    private String name;
    private String roomType;
    private Integer capacity;
    private Boolean isActive = true;
    private Long cinemaId;
}