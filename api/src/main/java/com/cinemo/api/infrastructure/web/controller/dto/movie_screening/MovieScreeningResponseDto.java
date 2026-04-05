package com.cinemo.api.infrastructure.web.controller.dto.movie_screening;

import com.cinemo.api.infrastructure.web.controller.dto.movie.MovieResponseDto;
import com.cinemo.api.infrastructure.web.controller.dto.cinema_room.CinemaRoomResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieScreeningResponseDto {
    private Long id;
    private LocalDateTime start;
    private LocalDateTime end;
    private Integer ticketsRemaining;
    private Integer totalCapacity;
    private String status;
    private MovieResponseDto movie;
    private CinemaRoomResponseDto room;
}