package com.cinemo.api.infrastructure.web.controller.dto.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cinemo.api.domain.User;

@Mapper(componentModel = "spring")
public interface UserDTOMapper {

    @Mapping(target = "id", ignore = true)
    User toDomain(UserRequestDTO dto);

    UserResponseDTO toResponse(User user);
    
}
