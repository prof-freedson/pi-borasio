package com.borasio_back.backend.model.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "eventos_culturais", schema = "carona")
public class EventoCultural {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;
    private String descricao;

    @Column(name = "data_evento")
    private LocalDateTime dataEvento;

    private String local;

    // getters e setters
}