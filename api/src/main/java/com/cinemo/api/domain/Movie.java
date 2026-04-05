package com.cinemo.api.domain;


import lombok.Data;

@Data
public class Movie {
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
