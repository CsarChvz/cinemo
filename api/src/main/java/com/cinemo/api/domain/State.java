package com.cinemo.api.domain;

import lombok.Data;

@Data
public class State {

    private Long id;

    private String name;

    private String code;

    public boolean hasValidName() {
        return this.name != null && this.name.trim().length() >= 3;
    }
}
