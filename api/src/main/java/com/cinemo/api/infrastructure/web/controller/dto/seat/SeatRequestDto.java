package com.cinemo.api.infrastructure.web.controller.dto.seat;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SeatRequestDto {
    @NotNull(message = "El ID del estado es obligatorio")
    private Long roomId;
    private String rowLetter;
    private Integer seatNumber;
}
