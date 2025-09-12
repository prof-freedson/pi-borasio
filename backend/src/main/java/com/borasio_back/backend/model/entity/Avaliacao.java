package com.borasio_back.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "avaliacoes", schema = "carona")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "corrida_id", nullable = false)
    private Corrida corrida;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private Integer nota; 
    // valores: 1 a 5

    @Column(columnDefinition = "TEXT")
    private String comentario;

    @Column(name = "data_avaliacao")
    private LocalDateTime dataAvaliacao;
}
