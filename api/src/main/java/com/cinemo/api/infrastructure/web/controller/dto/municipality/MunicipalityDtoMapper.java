package com.cinemo.api.infrastructure.web.controller.dto.municipality;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.cinemo.api.domain.Municipality;

@Mapper(componentModel = "spring")
public interface MunicipalityDtoMapper {

  // Para crear el dominio desde el Request (mantenemos tu lógica de stateId)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "state.id", source = "stateId")
  Municipality toDomain(MunicipalityRequestDto dto);

  // Para la respuesta: MapStruct hace la magia solo si los nombres coinciden.
  // Si en el dominio tienes 'state' y en el DTO tienes 'state', no necesitas
  // @Mapping.
  MunicipalityResponseDto toResponse(Municipality municipality);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "state.id", source = "stateId")
  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateDomainFromDto(MunicipalityUpdateRequestDto dto, @MappingTarget Municipality municipality);
}