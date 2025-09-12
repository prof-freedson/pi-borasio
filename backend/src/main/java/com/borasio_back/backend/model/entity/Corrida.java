package com.borasio_back.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "corridas", schema = "carona")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Corrida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "passageiro_id", nullable = false)
    private Passageiro passageiro;

    @ManyToOne
    @JoinColumn(name = "motorista_id", nullable = false)
    private Motorista motorista;

    @Column(nullable = false, length = 255)
    private String origem;

    @Column(nullable = false, length = 255)
    private String destino;

    @Column(name = "data_corrida")
    private LocalDateTime dataCorrida;

    @Column(nullable = false, length = 20)
    private String status; 
    // valores: "pendente", "em_andamento", "concluida", "cancelada"
}

