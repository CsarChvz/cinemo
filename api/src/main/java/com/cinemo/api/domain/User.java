package com.cinemo.api.domain;

import java.util.List;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String name;

    public boolean hasValidName(){
        return this.name != null && this.name.trim().length() >= 5;
    }
}
