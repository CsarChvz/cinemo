package com.cinemo.api.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieScreening {
    private Long id;
    private String state;
    private String municipality;
    private LocalDateTime start;
    private LocalDateTime end;
    private Integer ticketsRemaining;
    private Integer totalCapacity;
    private String status;
    private Movie movie;
    private CinemaRoom room;
}