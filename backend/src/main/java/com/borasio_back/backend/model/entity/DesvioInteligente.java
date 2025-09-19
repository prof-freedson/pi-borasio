package com.borasio_back.backend.model.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "desvios_inteligentes", schema = "carona")
public class DesvioInteligente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "corrida_id", nullable = false)
    private Corrida corrida;

    @Column(name = "rota_alternativa")
    private String rotaAlternativa;

    private String motivo;

    @Column(name = "data_desvio")
    private LocalDateTime dataDesvio;

    // getters e setters
}