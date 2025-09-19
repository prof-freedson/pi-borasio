package com.borasio_back.backend.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "administradores", schema = "carona")
public class Administrador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "nivel_acesso")
    private String nivelAcesso;

    // getters e setters
}