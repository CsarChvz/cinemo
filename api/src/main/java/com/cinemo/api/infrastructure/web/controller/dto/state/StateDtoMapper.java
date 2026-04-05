package com.cinemo.api.infrastructure.web.controller.dto.state;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.cinemo.api.domain.State;

@Mapper(componentModel = "spring")
public interface StateDtoMapper {
    @Mapping(target = "id", ignore = true)
    State toDomain(StateRequestDTO dto);

    StateResponseDTO toResponse(State state);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateDomainFromDto(StateUpdateRequestDTO dto, @MappingTarget State state);
}

