package com.cinemo.api.domain.ports.out;

import com.cinemo.api.domain.User;

public interface JwtPort {
    String generateToken(User user);
}