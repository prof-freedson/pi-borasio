package com.borasio_back.backend.dto;

import com.borasio_back.backend.model.entity.Usuario;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UsuarioDTO {
    private Long id;
    private String nome;
    private String email;
    private Usuario.TipoUsuario tipo; // aqui usamos o enum interno
    private LocalDateTime dataCadastro;

    public UsuarioDTO() {}

    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.tipo = usuario.getTipo();
        this.dataCadastro = usuario.getDataCadastro();
    }
}
