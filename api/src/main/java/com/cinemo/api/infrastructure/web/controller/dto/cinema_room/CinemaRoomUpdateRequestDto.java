package com.cinemo.api.infrastructure.web.controller.dto.cinema_room;

import lombok.Data;

@Data
public class CinemaRoomUpdateRequestDto {
    private String name;
    private String roomType;
    private Integer capacity;
    private Integer columnsPerRow;
    private Boolean isActive = true;
    private Long cinemaId;
}