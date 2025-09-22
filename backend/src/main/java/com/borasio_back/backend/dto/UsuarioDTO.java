package com.borasio_back.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UsuarioDTO {
    private Long id;
    private String nome;
    private String email;
    private String role;
    private LocalDateTime dataCadastro;
}