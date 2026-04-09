package com.cinemo.api.infrastructure.web.controller.dto.cinema_room;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleCinemaRoomResponseDto {
private Long id;
    private String name;
    private String roomType;
    private Integer capacity;
    private Boolean isActive;
    private Integer columnsPerRow;
    Long cinemaId;
}
