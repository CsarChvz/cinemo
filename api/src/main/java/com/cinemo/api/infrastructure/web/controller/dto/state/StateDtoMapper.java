package com.cinemo.api.infrastructure.web.controller.dto.state;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cinemo.api.domain.State;

@Mapper(componentModel = "spring")
public interface StateDtoMapper {
    @Mapping(target = "id", ignore = true)
    State toDomain(StateRequestDTO dto);

    StateResponseDTO toResponse(State state);
}

