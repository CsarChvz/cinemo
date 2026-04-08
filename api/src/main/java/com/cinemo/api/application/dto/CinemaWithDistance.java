package com.cinemo.api.application.dto;

import com.cinemo.api.domain.Cinema;

public record CinemaWithDistance(Cinema cinema, double distance) {
}