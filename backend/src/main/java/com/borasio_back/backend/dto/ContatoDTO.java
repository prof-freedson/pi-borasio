package com.borasio_back.backend.dto;

import java.time.LocalDateTime;

public class ContatoDTO {
    private Long idContato;
    private Long idUsuario;
    private String descricao;
    private LocalDateTime dataCriacao;

    public ContatoDTO() {}

    public ContatoDTO(Long idContato, Long idUsuario, String descricao, LocalDateTime dataCriacao) {
        this.idContato = idContato;
        this.idUsuario = idUsuario;
        this.descricao = descricao;
        this.dataCriacao = dataCriacao;
    }

    // Getters e Setters
    public Long getIdContato() { return idContato; }
    public void setIdContato(Long idContato) { this.idContato = idContato; }

    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }
}
