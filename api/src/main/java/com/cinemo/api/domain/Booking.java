package com.cinemo.api.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class Booking {
  private Long id;
  private Long userId;
  private Long functionId;
  private String status;
  private BigDecimal totalPrice;
  private LocalDateTime createdAt;
  private List<Long> seatStatusIds;
}