package com.cinemo.api.infrastructure.web.controller.dto.cinema_room;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.cinemo.api.domain.CinemaRoom;

@Mapper(componentModel = "spring")
public interface CinemaRoomDtoMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "cinema.id", source = "cinemaId")
    CinemaRoom toDomain(CinemaRoomRequestDto dto);

    CinemaRoomResponseDto toResponse(CinemaRoom domain);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "cinema.id", source = "cinemaId")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateDomainFromDto(CinemaRoomUpdateRequestDto dto, @MappingTarget CinemaRoom cinema);

}
