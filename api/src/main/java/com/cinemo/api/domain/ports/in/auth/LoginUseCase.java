package com.cinemo.api.domain.ports.in.auth;

public interface LoginUseCase {
    String login(String username, String password);
}