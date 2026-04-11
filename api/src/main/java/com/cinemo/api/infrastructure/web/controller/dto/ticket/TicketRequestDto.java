package com.cinemo.api.infrastructure.web.controller.dto.ticket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketRequestDto {
    private Long bookingId;
    private Long seatId;
    private BigDecimal price;
}