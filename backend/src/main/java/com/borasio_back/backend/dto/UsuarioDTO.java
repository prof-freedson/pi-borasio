package com.borasio_back.backend.dto;

import com.borasio_back.backend.model.entity.Usuario;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UsuarioDTO {
    private Long id;
    private String nome;
    private String email;
    private String role; // corresponde ao tipo do usuário
    private LocalDateTime dataCadastro;

    // Construtor vazio
    public UsuarioDTO() {}

    // Construtor que converte de Usuario
    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.role = usuario.getTipo(); // pega tipo e atribui à role
        this.dataCadastro = usuario.getDataCadastro();
    }
}
