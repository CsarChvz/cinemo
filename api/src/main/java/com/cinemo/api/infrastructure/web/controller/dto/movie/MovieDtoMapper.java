package com.cinemo.api.infrastructure.web.controller.dto.movie;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.cinemo.api.domain.Movie;

@Mapper(componentModel = "spring")
public interface MovieDtoMapper {
    @Mapping(target = "id", ignore = true)
    Movie toDomain(MovieRequestDto requestDto);

    MovieResponseDto toResponse(Movie domain);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateDomainFromDto(MovieUpdateRequestDto dto, @MappingTarget Movie movie);

}
