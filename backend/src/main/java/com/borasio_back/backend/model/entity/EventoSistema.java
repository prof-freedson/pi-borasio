package com.borasio_back.backend.model.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "eventos_sistema", schema = "carona")
public class EventoSistema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tipo_evento")
    private String tipoEvento;

    private String descricao;

    @Column(name = "data_evento")
    private LocalDateTime dataEvento;

    // getters e setters
}
