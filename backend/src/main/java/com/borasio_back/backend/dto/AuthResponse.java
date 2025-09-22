package com.borasio_back.backend.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String tipo = "Bearer";
    private Long usuarioId;
    private String email;
    private String role;
    
    public AuthResponse(String token, Long usuarioId, String email, String role) {
        this.token = token;
        this.usuarioId = usuarioId;
        this.email = email;
        this.role = role;
    }
}