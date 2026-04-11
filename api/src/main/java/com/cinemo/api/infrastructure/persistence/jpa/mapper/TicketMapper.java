package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cinemo.api.domain.Ticket;
import com.cinemo.api.infrastructure.persistence.jpa.entity.TicketEntity;

@Mapper(componentModel = "spring")
public interface TicketMapper {

    @Mapping(target = "id", source = "id")
    @Mapping(target = "booking.id", source = "bookingId")
    @Mapping(target = "seat.id", source = "seatId")
    @Mapping(target = "ticketCode", source = "ticketCode")
    @Mapping(target = "price", source = "price")
    @Mapping(target = "issuedAt", source = "issuedAt")
    TicketEntity toEntity(Ticket domain);

    @Mapping(target = "bookingId", source = "booking.id")
    @Mapping(target = "seatId", source = "seat.id")
    Ticket toDomain(TicketEntity entity);
}