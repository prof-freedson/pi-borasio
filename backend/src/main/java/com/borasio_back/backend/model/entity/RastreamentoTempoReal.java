package com.borasio_back.backend.model.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "rastreamento_tempo_real", schema = "carona")
public class RastreamentoTempoReal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "corrida_id", nullable = false)
    private Corrida corrida;

    private BigDecimal latitude;
    private BigDecimal longitude;

    @Column(name = "data_registro")
    private LocalDateTime dataRegistro;

    // getters e setters
}