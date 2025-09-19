package com.borasio_back.backend.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "acessibilidade", schema = "carona")
public class Acessibilidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "tipo_preferencia")
    private String tipoPreferencia;

    private String valor;

    // getters e setters
}
