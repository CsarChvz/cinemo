package com.cinemo.api.infrastructure.web.controller.dto.seat_status;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WaitlistResponseDto {
    private Long position;
    private int totalInQueue;
    private String message;
}
