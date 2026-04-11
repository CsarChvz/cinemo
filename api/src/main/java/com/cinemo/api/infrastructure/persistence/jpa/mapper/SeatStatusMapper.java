package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.cinemo.api.domain.SeatStatus;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;
import com.cinemo.api.infrastructure.persistence.jpa.entity.SeatStatusEntity;

@Mapper(config = GlobalMapperConfig.class)
public interface SeatStatusMapper {

    @Mapping(source = "seatId", target = "seat.id")
    @Mapping(source = "movieScreeningId", target = "screening.id")
    SeatStatusEntity toEntity(SeatStatus domain);

    @Mapping(source = "seat.id", target = "seatId")
    @Mapping(source = "screening.id", target = "movieScreeningId")
    SeatStatus toDomain(SeatStatusEntity entity);
}