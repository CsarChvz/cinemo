package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;

import com.cinemo.api.domain.Cinema;
import com.cinemo.api.infrastructure.persistence.jpa.entity.CinemaEntity;

@Mapper(componentModel = "spring")
public interface CinemaMapper {
  CinemaEntity toEntity(Cinema domain);

  Cinema toDomain(CinemaEntity entity);
}
