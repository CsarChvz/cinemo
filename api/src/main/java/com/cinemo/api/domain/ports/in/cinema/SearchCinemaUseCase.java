package com.cinemo.api.domain.ports.in.cinema;

import java.util.List;

import com.cinemo.api.application.dto.CinemaResponseDTO;
import com.cinemo.api.domain.Cinema;


public interface SearchCinemaUseCase {
    List<Cinema> getCinemasByMunicipalityId(Long municipalityId);

    List<CinemaResponseDTO> getNearest(double lat, double lng, double radius);

}
