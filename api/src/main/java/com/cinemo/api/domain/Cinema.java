package com.cinemo.api.domain;

import lombok.Data;

@Data
public class Cinema {

    private Long id;
    private String name;
    private String address;
    private Municipality municipality;
}
