package com.cinemo.api.infrastructure.web.controller.dto.seat_status;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SeatStatusResponseDto {
    private Long seatId;
    private String rowLetter;
    private Integer seatNumber;
    private String status; // AVAILABLE, RESERVED_TEMP, OCCUPIED
}
