package com.cinemo.api.infrastructure.web.controller.dto.movie;

import lombok.Data;

@Data
public class MovieUpdateRequestDto {

     private String title;
     private String posterUrl;
     private String genre;
     private Integer durationMin;
     private String description;
     private String director;
     private String producer;
     private String classification;
     private Integer releaseYear;
     private Boolean isActive = true;
}
