package com.cinemo.api.infrastructure.web.controller.dto.booking;

import java.util.List;
import lombok.Data;

@Data
public class BookingRequestDto {
    private Long userId;
    private Long functionId;
    private List<Long> seatStatusIds;
}