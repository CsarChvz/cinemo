package com.cinemo.api.infrastructure.persistence.jpa.adapter;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.cinemo.api.domain.SeatStatus;
import com.cinemo.api.domain.ports.out.SeatStatusRepositoryPort;
import com.cinemo.api.infrastructure.persistence.jpa.entity.SeatStatusEntity;
import com.cinemo.api.infrastructure.persistence.jpa.mapper.SeatStatusMapper;
import com.cinemo.api.infrastructure.persistence.jpa.repository.SeatStatusJpaRepository;

import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class SeatStatusJpaAdapter implements SeatStatusRepositoryPort {
    private final SeatStatusJpaRepository jpaRepository;
    private final SeatStatusMapper mapper;

    
@Override
    public List<SeatStatus> findByMovieScreeningId(Long movieScreeningId) {
        // 1. Buscamos las entidades usando el método del JpaRepository (Screening_Id)
        List<SeatStatusEntity> entities = jpaRepository.findByScreening_Id(movieScreeningId);
        
        // 2. Mapeamos la lista de entidades a objetos de dominio
        return entities.stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<SeatStatus> findBySeatIdAndMovieScreeningId(Long seatId, Long movieScreeningId) {
        // Buscamos el registro único por asiento y función
        return jpaRepository.findBySeat_IdAndScreening_Id(seatId, movieScreeningId)
                .map(mapper::toDomain);
    }

    @Override
    public SeatStatus save(SeatStatus seatStatus) {
        // Convertimos el dominio a entidad para persistir
        SeatStatusEntity entity = mapper.toEntity(seatStatus);
        SeatStatusEntity savedEntity = jpaRepository.save(entity);
        
        // Retornamos el dominio actualizado (con ID si es nuevo)
        return mapper.toDomain(savedEntity);
    }

    @Override
    public List<SeatStatus> saveAll(List<SeatStatus> seatStatuses) {
        // Mapeo masivo a entidades
        List<SeatStatusEntity> entities = seatStatuses.stream()
                .map(mapper::toEntity)
                .collect(Collectors.toList());
        
        // Guardado masivo (Batch insert)
        List<SeatStatusEntity> savedEntities = jpaRepository.saveAll(entities);
        
        // Retorno masivo a dominio
        return savedEntities.stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
    
}
