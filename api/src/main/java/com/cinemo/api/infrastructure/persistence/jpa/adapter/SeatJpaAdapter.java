package com.cinemo.api.infrastructure.persistence.jpa.adapter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.cinemo.api.domain.Seat;
import com.cinemo.api.domain.ports.out.SeatRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.entity.SeatEntity;
import com.cinemo.api.infrastructure.persistence.jpa.mapper.SeatMapper;
import com.cinemo.api.infrastructure.persistence.jpa.repository.SeatJpaRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SeatJpaAdapter implements SeatRepositoryPort{

    private final SeatJpaRepository jpaRepository;
    private final SeatMapper mapper;
    @Override
    public List<Seat> findByRoomId(Long roomdId) {
        return jpaRepository.findByRoomId(roomdId).stream().map(mapper::toDomain).toList();
    }
    
    @Override
    public Seat save(Seat seat) {
        SeatEntity entity = mapper.toEntity(seat);
        SeatEntity entitySaved = jpaRepository.save(entity);
        return mapper.toDomain(entitySaved);
    }

    @Override
    public List<Seat> saveAll(List<Seat> seats) {
        List<SeatEntity> entities = seats.stream()
                    .map(mapper::toEntity)
                    .collect(Collectors.toList());

            List<SeatEntity> savedEntities = jpaRepository.saveAll(entities);

            return savedEntities.stream()
                    .map(mapper::toDomain)
                    .collect(Collectors.toList());
    }
}
