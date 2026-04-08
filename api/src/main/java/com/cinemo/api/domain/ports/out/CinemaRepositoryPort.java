package com.cinemo.api.domain.ports.out;

import java.util.List;
import java.util.Optional;

import com.cinemo.api.domain.Cinema;
import com.cinemo.api.domain.Location;

public interface CinemaRepositoryPort {

    Cinema save(Cinema cinema);

    List<Cinema> findAll();

    Optional<Cinema> findById(Long id);

    Cinema modify(Cinema cinema);

    void delete(Cinema cinema);

    List<Cinema> findByMunicipalityId(Long municipalityId);

}
