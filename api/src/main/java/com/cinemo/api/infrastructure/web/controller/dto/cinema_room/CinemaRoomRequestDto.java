package com.cinemo.api.infrastructure.web.controller.dto.cinema_room;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CinemaRoomRequestDto {

    @NotBlank(message = "El nombre de la sala es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder los 100 caracteres")
    private String name;

    @Size(max = 50, message = "El tipo de sala no puede exceder los 50 caracteres")
    private String roomType;

    @NotNull(message = "La capacidad es obligatoria")
    @Min(value = 1, message = "La capacidad debe ser al menos de 1 persona")
    private Integer capacity;

    private Boolean isActive = true;

    @NotNull(message = "El ID del cine es obligatorio")
    private Long cinemaId;
}