package com.cinemo.api.infrastructure.persistence.jpa.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
@Data
@NoArgsConstructor
public class BookingEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "function_id", nullable = false)
  private MovieScreeningEntity screening;

  @Column(nullable = false, length = 20)
  private String status; // PENDING, CONFIRMED, CANCELLED

  @Column(name = "total_price", nullable = false, precision = 8, scale = 2)
  private BigDecimal totalPrice;

  @Column(name = "created_at")
  private LocalDateTime createdAt = LocalDateTime.now();

  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
    if (this.status == null)
      this.status = "PENDING";
  }
}