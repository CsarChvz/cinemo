package com.cinemo.api.infrastructure.web.controller.dto.movie_screening;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

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

    @Mapping(target = "movie.id", source = "movieId")
    @Mapping(target = "room.id", source = "roomId")
    @Mapping(target = "ticketsRemaining", source = "totalCapacity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateDomainFromDto(MovieScreeningUpdateRequestDto dto, @MappingTarget MovieScreening movieScreening);
}