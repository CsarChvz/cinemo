package com.cinemo.api.infrastructure.web.controller.dto.seat;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SeatResponseDto {
    private Long id;
    private Long roomId;
    private String rowLetter;
    private Integer seatNumber;
}
