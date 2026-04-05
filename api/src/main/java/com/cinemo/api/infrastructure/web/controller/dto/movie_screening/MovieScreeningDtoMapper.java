package com.cinemo.api.infrastructure.web.controller.dto.movie_screening;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.cinemo.api.domain.MovieScreening;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;

@Mapper(config = GlobalMapperConfig.class)
public interface MovieScreeningDtoMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "movie.id", source = "movieId")
    @Mapping(target = "room.id", source = "roomId")
    @Mapping(target = "ticketsRemaining", source = "totalCapacity")
    MovieScreening toDomain(MovieScreeningRequestDto dto);

    MovieScreeningResponseDto toResponse(MovieScreening domain);
}