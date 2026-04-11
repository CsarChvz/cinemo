package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cinemo.api.domain.Booking;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;
import com.cinemo.api.infrastructure.persistence.jpa.entity.BookingEntity;

@Mapper(config = GlobalMapperConfig.class)
public interface BookingMapper {

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "functionId", target = "screening.id")
    @Mapping(target = "seatStatuses", ignore = true)
    BookingEntity toEntity(Booking domain);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "screening.id", target = "functionId")
    @Mapping(target = "seatStatusIds", expression = "java(entity.getSeatStatuses() != null ? entity.getSeatStatuses().stream().map(s -> s.getId()).toList() : null)")
    Booking toDomain(BookingEntity entity);

}
