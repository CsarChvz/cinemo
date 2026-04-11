package com.cinemo.api.infrastructure.web.controller.dto.ticket;


import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class TicketResponseDto {
    private Long id;
    private Long bookingId;
    private Long seatId;
    private String movieName; // Espacio para info extra si la necesitas
    private String seatNumber; // Espacio para info extra
    private String ticketCode;
    private BigDecimal price;
    private LocalDateTime issuedAt;
}