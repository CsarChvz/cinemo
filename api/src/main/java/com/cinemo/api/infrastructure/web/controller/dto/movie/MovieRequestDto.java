package com.cinemo.api.infrastructure.web.controller.dto.movie;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class MovieRequestDto {

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 255, message = "El título no puede exceder los 255 caracteres")
    private String title;

    @Size(max = 500, message = "La URL del poster es demasiado larga")
    private String posterUrl;

    @NotBlank(message = "El género es obligatorio")
    @Size(max = 100)
    private String genre;

    @NotNull(message = "La duración es obligatoria")
    @Min(value = 1, message = "La duración debe ser al menos de 1 minuto")
    private Integer durationMin;

    @Size(max = 2000, message = "La descripción no puede exceder los 2000 caracteres")
    private String description;

    @Size(max = 150)
    private String director;

    @Size(max = 150)
    private String producer;

    @NotBlank(message = "La clasificación es obligatoria (ej. A, B15, C)")
    @Size(max = 10)
    private String classification;

    @NotNull(message = "El año de lanzamiento es obligatorio")
    @Min(1895) // Año de la primera película de la historia
    @Max(2100)
    private Integer releaseYear;

    private Boolean isActive = true;
}