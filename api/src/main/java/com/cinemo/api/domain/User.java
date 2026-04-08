package com.cinemo.api.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long id;
    private String name;
    private String username;
    private String email;
    private String password;

    private Role role;

    public boolean hasValidName() {
        return this.name != null && this.name.trim().length() >= 5;
    }
}
