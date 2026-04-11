package com.cinemo.api.infrastructure.web.controller.dto.seat_status;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SelectSeatRequestDto {
    @NotNull(message = "El ID de la función es obligatorio")
    private Long movieScreeningId;

    @NotNull(message = "El ID del asiento es obligatorio")
    private Long seatId;

    @NotNull(message = "El ID del usuario es obligatorio")
    private Long userId;
}
