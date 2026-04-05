package com.cinemo.api.infrastructure.web.controller.dto.movie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieResponseDto {
    private Long id;
    private String title;
    private String posterUrl;
    private String genre;
    private Integer durationMin;
    private String description;
    private String director;
    private String producer;
    private String classification;
    private Integer releaseYear;
    private Boolean isActive;
}