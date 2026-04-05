package com.cinemo.api.infrastructure.web.controller.dto.movie_screening;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MovieScreeningRequestDto {
    @NotNull(message = "La fecha de inicio es obligatoria")
    private LocalDateTime start;

    @NotNull(message = "La fecha de fin es obligatoria")
    private LocalDateTime end;

    @NotNull(message = "La capacidad total es obligatoria")
    private Integer totalCapacity;

    private String status = "SCHEDULED";

    @NotNull(message = "El ID de la película es obligatorio")
    private Long movieId;

    @NotNull(message = "El ID de la sala es obligatorio")
    private Long roomId;
}