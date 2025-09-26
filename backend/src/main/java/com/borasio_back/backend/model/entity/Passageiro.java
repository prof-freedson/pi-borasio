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

    // ----------------------------------------
    // Métodos auxiliares
    // ----------------------------------------
    public String getNome() {
        return usuario != null ? usuario.getNome() : null;
    }

    public String getEmail() {
        return usuario != null ? usuario.getEmail() : null;
    }
}
