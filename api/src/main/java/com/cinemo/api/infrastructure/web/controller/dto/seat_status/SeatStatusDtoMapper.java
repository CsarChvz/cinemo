package com.cinemo.api.infrastructure.web.controller.dto.seat_status;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cinemo.api.domain.SeatStatus;

@Mapper(componentModel = "spring")
public interface SeatStatusDtoMapper {
    @Mapping(target = "id", ignore = true) 
    @Mapping(target = "reservedAt", ignore = true) 
    @Mapping(target = "status", constant = "AVAILABLE")

    SeatStatus toDomain(SelectSeatRequestDto request);
    SeatStatusResponseDto toResponse(SeatStatus domain);

    List<SeatStatusResponseDto> toResponseList(List<SeatStatus> domainList);

}
