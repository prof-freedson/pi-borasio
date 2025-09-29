package com.borasio_back.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "passageiros", schema = "carona")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Passageiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(length = 255)
    private String preferencias;

    @Column(length = 14)
    private String cpf;

    @Column(length = 255)
    private String endereco;

    @Column(length = 20)
    private String telefone;

    // ----------------------------------------
    // Métodos auxiliares para acessar dados do usuário
    // ----------------------------------------
    public String getNome() {
        return usuario != null ? usuario.getNome() : null;
    }

    public String getEmail() {
        return usuario != null ? usuario.getEmail() : null;
    }

    public String getSenha() {
        return usuario != null ? usuario.getSenha() : null;
    }

}