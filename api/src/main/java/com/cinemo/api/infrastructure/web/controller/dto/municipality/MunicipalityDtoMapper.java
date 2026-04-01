package com.cinemo.api.infrastructure.web.controller.dto.municipality;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cinemo.api.domain.Municipality;

@Mapper(componentModel = "spring")
public interface MunicipalityDtoMapper {
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "state.id", source = "stateId")
  Municipality toDomain(MunicipalityRequestDto dto);

  @Mapping(target = "stateId", source = "state.id")
  @Mapping(target = "stateName", source = "state.name")
  MunicipalityResponseDto toResponse(Municipality municipality);
}
