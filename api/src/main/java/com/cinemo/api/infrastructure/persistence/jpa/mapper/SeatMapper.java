package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cinemo.api.domain.Seat;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;
import com.cinemo.api.infrastructure.persistence.jpa.entity.SeatEntity;

@Mapper(config = GlobalMapperConfig.class)
public interface SeatMapper {
    @Mapping(source = "room.id", target = "roomId")
    Seat toDomain(SeatEntity entity);

    @Mapping(source = "roomId", target = "room.id")
    SeatEntity toEntity(Seat domain);
}
