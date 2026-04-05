package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;
import com.cinemo.api.domain.User;
import com.cinemo.api.infrastructure.persistence.jpa.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserEntity toEntity(User domain);

    User toDomain(UserEntity entity);
}