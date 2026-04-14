package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cinemo.api.domain.Seat;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;
import com.cinemo.api.infrastructure.persistence.jpa.entity.CinemaRoomEntity;
import com.cinemo.api.infrastructure.persistence.jpa.entity.SeatEntity;

@Mapper(config = GlobalMapperConfig.class)
public interface SeatMapper {
    @Mapping(source = "room.id", target = "roomId")
    Seat toDomain(SeatEntity entity);

    @Mapping(source = "roomId", target = "room.id")
    SeatEntity toEntity(Seat domain);

    default Long mapRoomToId(CinemaRoomEntity room) {
        return room != null ? room.getId() : null;
    }

    default CinemaRoomEntity mapIdToRoom(Long id) {
        if (id == null)
            return null;
        CinemaRoomEntity room = new CinemaRoomEntity();
        room.setId(id);
        return room;
    }
}
