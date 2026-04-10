package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;

import com.cinemo.api.domain.Booking;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;
import com.cinemo.api.infrastructure.persistence.jpa.entity.BookingEntity;

@Mapper(config = GlobalMapperConfig.class)
public interface BookinMapper {
  @Mapper(config = GlobalMapperConfig.class)
  public interface BookingMapper {

    Booking toDomain(BookingEntity entity);

    BookingEntity toEntity(Booking domain);
  }

}
