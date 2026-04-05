package com.cinemo.api.infrastructure.web.controller.dto.cinema_room;

import com.cinemo.api.infrastructure.web.controller.dto.cinema.CinemaResponseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CinemaRoomResponseDto {
private Long id;
    private String name;
    private String roomType;
    private Integer capacity;
    private Boolean isActive;
    private CinemaResponseDto cinema;
}
