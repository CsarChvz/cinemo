package com.cinemo.api.infrastructure.persistence.jpa.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "movie")
@NoArgsConstructor
public class MovieEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "poster_url", nullable = false)
    private String posterUrl;

    @Column(name = "genre", nullable = false, length = 100)
    private String genre;

    @Column(name = "duration_min", nullable = false)
    private Integer durationMin;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "director", nullable = false, length = 150)
    private String director;

    @Column(name = "producer", length = 150)
    private String producer;

    @Column(name = "classification", nullable = false, length = 50)
    private String classification;

    @Column(name = "release_year", nullable = false)
    private Integer releaseYear;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
}