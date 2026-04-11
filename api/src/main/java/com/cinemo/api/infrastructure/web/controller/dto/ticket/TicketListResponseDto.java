package com.cinemo.api.infrastructure.web.controller.dto.ticket;


import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class TicketListResponseDto {
    private Long bookingId;
    private Integer totalTickets;
    private List<TicketResponseDto> tickets;
}