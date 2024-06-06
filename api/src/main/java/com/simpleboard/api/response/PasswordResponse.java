package com.simpleboard.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PasswordResponse {

    private final String password;

    @Builder
    public PasswordResponse(String password) {
        this.password = password;
    }
}
