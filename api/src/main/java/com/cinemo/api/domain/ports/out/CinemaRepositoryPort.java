package com.cinemo.api.domain.ports.out;


import com.cinemo.api.domain.Cinema;

public interface CinemaRepositoryPort {

    Cinema save(Cinema cinema);
}
