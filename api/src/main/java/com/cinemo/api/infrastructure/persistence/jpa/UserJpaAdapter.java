package com.cinemo.api.infrastructure.persistence.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.cinemo.api.domain.User;
import com.cinemo.api.domain.ports.out.UserRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.entity.UserEntity;
import com.cinemo.api.infrastructure.persistence.jpa.repository.UserJpaRepository;

import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class UserJpaAdapter implements UserRepositoryPort {

    private final UserJpaRepository jpaRepository;
    private final UserMapper mapper;

    @Override
    public User saveUser(User user) {
        UserEntity userEntity = mapper.toEntity(user);

        UserEntity userSavedEntity = jpaRepository.save(userEntity);

        return mapper.toDomain(userSavedEntity);
    }

    @Override
    public Optional<User> findByName(String name) {
        return jpaRepository.findByName(name).map(mapper::toDomain);
    }

    @Override
    public List<User> findAll() {
        return jpaRepository.findAll().stream().map(mapper::toDomain).toList();
    }

    @Override
    public Optional<User> findById(Long id) {
        return jpaRepository.findById(id).map(mapper::toDomain);
    }

}
