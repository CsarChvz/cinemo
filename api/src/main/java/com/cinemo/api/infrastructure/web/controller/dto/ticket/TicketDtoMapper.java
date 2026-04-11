package com.cinemo.api.infrastructure.web.controller.dto.ticket;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cinemo.api.domain.Ticket;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;

@Mapper(config = GlobalMapperConfig.class)
public interface TicketDtoMapper {

    @Mapping(target = "movieName", ignore = true) 
    @Mapping(target = "seatNumber", ignore = true)
    TicketResponseDto toResponse(Ticket domain);

    List<TicketResponseDto> toResponseList(List<Ticket> domainList);
}