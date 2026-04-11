package com.cinemo.api.infrastructure.web.controller.dto.seat;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cinemo.api.domain.Seat;

@Mapper(componentModel = "spring")
public interface SeatDtoMapper {
    @Mapping(target = "id", ignore = true)
    Seat toDomain(SeatRequestDto dto);

    SeatResponseDto toResponse(Seat domain);
}

