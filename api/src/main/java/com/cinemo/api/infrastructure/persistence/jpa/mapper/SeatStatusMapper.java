package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;

import com.cinemo.api.domain.SeatStatus;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;
import com.cinemo.api.infrastructure.persistence.jpa.entity.SeatStatusEntity;

@Mapper(config = GlobalMapperConfig.class)
public interface SeatStatusMapper {
    SeatStatusEntity toEntity(SeatStatus domain);
    SeatStatus toDomain(SeatStatusEntity entity);
}



