package com.cinemo.api.infrastructure.web.controller.dto.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cinemo.api.domain.User;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;

@Mapper(config = GlobalMapperConfig.class)
public interface UserDtoMapper {

    @Mapping(target = "id", ignore = true)
    User toDomain(UserRequestDto dto);

    UserResponseDTO toResponse(User user);
}