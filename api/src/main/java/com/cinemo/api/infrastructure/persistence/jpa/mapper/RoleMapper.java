package com.cinemo.api.infrastructure.persistence.jpa.mapper;

import org.mapstruct.Mapper;

import com.cinemo.api.domain.Role;
import com.cinemo.api.infrastructure.config.GlobalMapperConfig;
import com.cinemo.api.infrastructure.persistence.jpa.entity.RoleEntity;

@Mapper(config = GlobalMapperConfig.class)
public interface RoleMapper {
  RoleEntity toEntity(Role domain);

  Role toDomain(RoleEntity entity);

}
