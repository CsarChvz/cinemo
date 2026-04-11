package com.cinemo.api.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {
    private Long id;
    private Long bookingId; 
    private Long seatId;
    private String ticketCode;
    private BigDecimal price;
    private LocalDateTime issuedAt;
}
