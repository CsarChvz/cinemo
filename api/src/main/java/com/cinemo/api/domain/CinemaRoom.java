package com.cinemo.api.domain;

import lombok.Data;

@Data
public class CinemaRoom {

    private Long id;
    private String name;
    private String roomType;
    private Integer capacity;
    private Boolean isActive = true;
    private Cinema cinema;

}
