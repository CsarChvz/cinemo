package com.cinemo.api.infrastructure.web.controller.dto;

import org.mapstruct.Mapper;

import com.cinemo.api.domain.User;

@Mapper(componentModel = "spring")
public interface UserDTOMapper {

    User toDomain(UserRequestDTO dto);

    UserResponseDTO toResponse(User user);
    
}
