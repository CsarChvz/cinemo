package com.cinemo.api.infrastructure.web.controller.dto.booking;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.cinemo.api.domain.Booking;

@Mapper(componentModel = "spring")
public interface BookingDtoMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "totalPrice", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Booking toDomain(BookingRequestDto dto);

    BookingResponseDto toResponse(Booking domain);
}