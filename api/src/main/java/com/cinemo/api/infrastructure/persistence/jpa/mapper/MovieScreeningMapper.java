package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;

import com.cinemo.api.domain.MovieScreening;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;
import com.cinemo.api.infrastructure.persistence.jpa.entity.MovieScreeningEntity;

@Mapper(config = GlobalMapperConfig.class)
public interface MovieScreeningMapper {

    MovieScreeningEntity toEntity(MovieScreening domain);
    MovieScreening toDomain(MovieScreeningEntity entity);
}