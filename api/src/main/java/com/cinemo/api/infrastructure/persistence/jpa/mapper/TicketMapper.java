package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cinemo.api.domain.Ticket;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;
import com.cinemo.api.infrastructure.persistence.jpa.entity.TicketEntity;

@Mapper(config = GlobalMapperConfig.class)
public interface TicketMapper {

    @Mapping(target = "booking.id", source = "bookingId")
    @Mapping(target = "seat.id", source = "seatId")
    TicketEntity toEntity(Ticket domain);

    @Mapping(target = "bookingId", source = "booking.id")
    @Mapping(target = "seatId", source = "seat.id")
    Ticket toDomain(TicketEntity entity);
}