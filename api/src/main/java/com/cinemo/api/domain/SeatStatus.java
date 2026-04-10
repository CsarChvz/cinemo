package com.cinemo.api.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeatStatus {
    private Long id;
    private Long seatId;
    private Long movieScreeningId;
    private String status; // AVAILABLE, RESERVED, OCCUPIED
    private LocalDateTime reservedAt;
}