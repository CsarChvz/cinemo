package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;

import com.cinemo.api.domain.Municipality;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;
import com.cinemo.api.infrastructure.persistence.jpa.entity.MunicipalityEntity;

@Mapper(config = GlobalMapperConfig.class)
public interface MunicipalityMapper {
  MunicipalityEntity toEntity(Municipality domain);

  Municipality toDomain(MunicipalityEntity entity);
}
