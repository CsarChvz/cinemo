package com.cinemo.api.infrastructure.web.controller.dto.movie;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cinemo.api.domain.Movie;

@Mapper(componentModel = "spring")
public interface MovieDtoMapper {
    @Mapping(target = "id", ignore = true)
    Movie toDomain(MovieRequestDto requestDto);

    MovieResponseDto toResponse(Movie domain);
}
