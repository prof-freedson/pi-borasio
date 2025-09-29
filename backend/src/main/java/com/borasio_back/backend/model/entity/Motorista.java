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

    @Column(length = 20, nullable = false, unique = true)
    private String cnh;

    @Column(length = 10, nullable = false, unique = true)
    private String placa;

    @Column(length = 50)
    private String marca;

    @Column(length = 50)
    private String modelo;

    @Column(length = 30)
    private String cor;

    @Column(length = 30)
    private String combustivel; // Gasolina, Etanol, Flex, etc.

    @Column
    private Boolean arCondicionado;

    @Column
    private Integer assentos;

    @Column(length = 20)
    private String telefone;

    @Column(length = 255)
    private String endereco;

    // ----------------------------------------
    // Métodos auxiliares
    // ----------------------------------------
    public String getNome() {
        return usuario != null ? usuario.getNome() : null;
    }

    public String getEmail() {
        return usuario != null ? usuario.getEmail() : null;
    }
    public String getSenha() {
        return usuario != null ? usuario.getSenha() : null;
    }
}
