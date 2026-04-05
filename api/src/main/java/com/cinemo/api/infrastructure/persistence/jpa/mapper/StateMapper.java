package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;

import com.cinemo.api.domain.State;
import com.cinemo.api.infrastructure.persistence.jpa.entity.StateEntity;

@Mapper(componentModel = "spring")
public interface StateMapper {
    StateEntity toEntity(State domain);

    State toDomain(StateEntity entity);
}
