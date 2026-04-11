package com.cinemo.api.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Seat {
    private Long id;
    private Long roomId;
    private String rowLetter;
    private Integer seatNumber;
}
