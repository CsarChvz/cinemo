package com.cinemo.api.domain.ports.in.cinema;

import com.cinemo.api.domain.Cinema;

public interface ManageCinemaUseCase {
    Cinema create(Cinema cinema);

    void delete(Cinema cinema);
}
