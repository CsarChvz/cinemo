package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;

import com.cinemo.api.domain.Movie;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;
import com.cinemo.api.infrastructure.persistence.jpa.entity.MovieEntity;

@Mapper(config = GlobalMapperConfig.class)
public interface MovieMapper {
    MovieEntity toEntity(Movie domain);
    Movie toDomain(MovieEntity entity);
}
