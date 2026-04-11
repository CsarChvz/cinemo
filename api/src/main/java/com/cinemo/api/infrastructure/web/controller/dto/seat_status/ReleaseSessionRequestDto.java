package com.cinemo.api.infrastructure.web.controller.dto.seat_status;

import lombok.Data;

@Data
public class ReleaseSessionRequestDto {
    private Long userId;
    private Long movieScreeningId;
}