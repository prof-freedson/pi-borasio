package com.borasio_back.backend.dto;

import com.borasio_back.backend.model.entity.Passageiro;
import lombok.Data;

@Data
public class PassageiroDTO {
    private Long id;
    private Long usuarioId;
    private String nome;
    private String email;
    private String preferencias;
    private String cpf;
    private String endereco;
    private String telefone;

    // Construtor vazio
    public PassageiroDTO() {}

    // Construtor que converte de Passageiro
    public PassageiroDTO(Passageiro passageiro) {
        if (passageiro != null) {
            this.id = passageiro.getId();
            this.usuarioId = passageiro.getUsuario() != null ? passageiro.getUsuario().getId() : null;
            this.nome = passageiro.getNome();
            this.email = passageiro.getEmail();
            this.preferencias = passageiro.getPreferencias();
            this.cpf = passageiro.getCpf();
            this.endereco = passageiro.getEndereco();
            this.telefone = passageiro.getTelefone();
        }
    }
}
