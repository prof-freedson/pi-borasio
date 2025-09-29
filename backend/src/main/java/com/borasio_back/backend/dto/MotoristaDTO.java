package com.borasio_back.backend.dto;

import com.borasio_back.backend.model.entity.Motorista;
import lombok.Data;

@Data
public class MotoristaDTO {
    private Long id;
    private Long usuarioId;
    private String nome;
    private String email;
    private String cnh;
    private String placa;
    private String marca;
    private String modelo;
    private String cor;
    private Boolean arCondicionado;
    private String combustivel;
    private Integer assentos;
    private String telefone;
    private String endereco;

    // Construtor vazio
    public MotoristaDTO() {}

    // Construtor que converte de Motorista
    public MotoristaDTO(Motorista motorista) {
        if (motorista != null) {
            this.id = motorista.getId();
            this.usuarioId = motorista.getUsuario() != null ? motorista.getUsuario().getId() : null;
            this.nome = motorista.getNome();
            this.email = motorista.getEmail();
            this.cnh = motorista.getCnh();
            this.placa = motorista.getPlaca();
            this.marca = motorista.getMarca();
            this.modelo = motorista.getModelo();
            this.cor = motorista.getCor();
            this.arCondicionado = motorista.getArCondicionado();
            this.combustivel = motorista.getCombustivel();
            this.assentos = motorista.getAssentos();
            this.telefone = motorista.getTelefone();
            this.endereco = motorista.getEndereco();
        }
    }
}
