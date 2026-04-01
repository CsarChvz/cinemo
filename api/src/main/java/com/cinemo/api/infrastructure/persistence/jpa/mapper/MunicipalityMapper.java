package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;

import com.cinemo.api.domain.Municipality;
import com.cinemo.api.infrastructure.persistence.jpa.entity.MunicipalityEntity;

@Mapper(componentModel = "spring")
public interface MunicipalityMapper {
  MunicipalityEntity toEntity(Municipality domain);

  Municipality toDomain(MunicipalityEntity entity);
}
