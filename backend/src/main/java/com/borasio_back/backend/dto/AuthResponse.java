package com.borasio_back.backend.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String tipo = "Bearer";
    private Long usuarioId;
    private String email;
    private String nome;
    private String role;

    public AuthResponse(String token, Long usuarioId, String nome, String email, String role) {
        this.token = token;
        this.usuarioId = usuarioId;
        this.nome = nome;
        this.email = email;
        this.role = role;
    }
}