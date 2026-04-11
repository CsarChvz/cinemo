package com.cinemo.api.infrastructure.persistence.jpa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cinemo.api.infrastructure.persistence.jpa.entity.MovieScreeningEntity;

public interface MovieScreeningJpaRepostory extends JpaRepository<MovieScreeningEntity, Long> {
    @Override
    @EntityGraph(attributePaths = {"movie", "room", "room.cinema"})
    List<MovieScreeningEntity> findAll();

    @Override
    @EntityGraph(attributePaths = {"movie", "room", "room.cinema"})
    Optional<MovieScreeningEntity> findById(Long id);

    @Query("SELECT ms FROM MovieScreeningEntity ms " +
            "JOIN FETCH ms.movie m " +
            "JOIN FETCH ms.room r " +
            "JOIN FETCH r.cinema c " +
            "JOIN FETCH c.municipality mun " +
            "JOIN FETCH mun.state s " +
            "WHERE (:movieId IS NULL OR m.id = :movieId) " +
            "AND (:cinemaId IS NULL OR c.id = :cinemaId) " +
            "AND (:municipalityId IS NULL OR mun.id = :municipalityId) " +
            "AND (:stateId IS NULL OR s.id = :stateId)")
    List<MovieScreeningEntity> searchScreenings(
            @Param("movieId") Long movieId,
            @Param("stateId") Long stateId,
            @Param("municipalityId") Long municipalityId,
            @Param("cinemaId") Long cinemaId);

    @Query("SELECT m FROM MovieScreeningEntity m " +
                    "JOIN FETCH m.movie " +
                    "WHERE m.room.id = :roomId " +
                    "AND CAST(m.start AS date) = :date")
    List<MovieScreeningEntity> findByRoomIdAndDate(
                    @Param("roomId") Long roomId,
                    @Param("date") java.time.LocalDate date);
}
