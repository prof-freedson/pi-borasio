package com.borasio_back.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "motoristas", schema = "carona")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Motorista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(length = 20)
    private String cnh;

    @Column(length = 100)
    private String veiculo;
}

