package com.cinemo.api.infrastructure.web.controller.dto.movie_screening;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MovieScreeningUpdateRequestDto {
    private LocalDateTime start;
    private LocalDateTime end;
    private Integer totalCapacity;
    private String status = "SCHEDULED";
    private Long movieId;
    private Long roomId;
}