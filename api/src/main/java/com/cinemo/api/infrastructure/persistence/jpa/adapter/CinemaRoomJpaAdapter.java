package com.cinemo.api.infrastructure.persistence.jpa.adapter;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.cinemo.api.domain.CinemaRoom;
import com.cinemo.api.domain.ports.out.CinemaRoomRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.entity.CinemaRoomEntity;
import com.cinemo.api.infrastructure.persistence.jpa.mapper.CinemaRoomMapper;
import com.cinemo.api.infrastructure.persistence.jpa.repository.CinemaRoomJpaRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CinemaRoomJpaAdapter implements CinemaRoomRepositoryPort {
    private final CinemaRoomJpaRepository jpaRepository;
    private final CinemaRoomMapper mapper;
    @Override
    public CinemaRoom save(CinemaRoom cinemaRoom) {
        CinemaRoomEntity entity = mapper.toEntity(cinemaRoom);
        CinemaRoomEntity entitySaved = jpaRepository.save(entity);

        return mapper.toDomain(entitySaved);
    }

    @Override
    public Optional<CinemaRoom> findById(Long id) {
        return jpaRepository.findById(id).map(mapper::toDomain);
    }

    @Override
    public List<CinemaRoom> findAll() {
        return jpaRepository.findAll().stream().map(mapper::toDomain).toList();
    }

    @Override
    public void delete(CinemaRoom cinema) {
        CinemaRoomEntity entity = mapper.toEntity(cinema);
        jpaRepository.delete(entity);
    }

    @Override
    public CinemaRoom modify(CinemaRoom cinema) {
        CinemaRoomEntity entity = mapper.toEntity(cinema);
        CinemaRoomEntity savedEntity = jpaRepository.save(entity);

        return mapper.toDomain(savedEntity);
    }

    @Override
    public List<CinemaRoom> findRoomsByCinemaId(Long roomId) {
        return jpaRepository.findByCinemaId(roomId).stream().map(mapper::toDomain).toList();
    }

}
