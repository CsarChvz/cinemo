package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;

import com.cinemo.api.domain.CinemaRoom;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;
import com.cinemo.api.infrastructure.persistence.jpa.entity.CinemaRoomEntity;

@Mapper(config = GlobalMapperConfig.class)
public interface CinemaRoomMapper {
    CinemaRoomEntity toEntity(CinemaRoom domain);
    CinemaRoom toDomain(CinemaRoomEntity entity);
}
