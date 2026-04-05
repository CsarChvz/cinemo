package com.cinemo.api.infrastructure.web.controller.dto.cinema;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.cinemo.api.domain.Cinema;

@Mapper(componentModel = "spring") // No necesitas 'uses' aquí para el Request
public interface CinemaDtoMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "municipality.id", source = "municipalityId")
    Cinema toDomain(CinemaRequestDto dto);

    CinemaResponseDto toResponse(Cinema cinema);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "municipality.id", source = "municipalityId")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateDomainFromDto(CinemaUpdateRequestDto dto, @MappingTarget Cinema cinema);
}