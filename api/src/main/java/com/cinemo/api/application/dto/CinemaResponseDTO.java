package com.cinemo.api.application.dto;

import com.cinemo.api.domain.Cinema;

public record CinemaResponseDTO(
        Long id,
        String name,
        double latitude,
        double longitude,
        double distance) {
    // Constructor de conveniencia para mapear desde el dominio
    public CinemaResponseDTO(Cinema cinema, double distance) {
        this(cinema.getId(), cinema.getName(), cinema.getLatitude(), cinema.getLongitude(), distance);
    }
}