package com.cinemo.api.infrastructure.persistence.jpa.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "movie_screening")
@NoArgsConstructor
public class MovieScreeningEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    private MovieEntity movie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private CinemaRoomEntity room;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime start;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime end;

    @Column(name = "available_tickets", nullable = false)
    private Integer ticketsRemaining;

    @Column(name = "total_capacity", nullable = false)
    private Integer totalCapacity;

    @Column(name = "status", nullable = false, length = 50)
    private String status;
}