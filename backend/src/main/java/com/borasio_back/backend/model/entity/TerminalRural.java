package com.borasio_back.backend.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "terminais_rurais", schema = "carona")
public class TerminalRural {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;
    private String localizacao;

    // getters e setters
}