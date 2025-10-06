package com.borasio_back.backend.model.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contatos", schema = "carona")
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_contato")
    private Long idContato;

    @Column(name = "id_usuario", nullable = false)
    private Long idUsuario;

    @Column(name = "descricao", nullable = false, length = 500)
    private String descricao;

    // 🔹 Não vamos deixar o JPA inserir esse campo, o banco gera automaticamente
    @Column(name = "data_criacao", insertable = false, updatable = false)
    private LocalDateTime dataCriacao;

    public Contato() {}

    public Contato(Long idUsuario, String descricao) {
        this.idUsuario = idUsuario;
        this.descricao = descricao;
    }

    // Getters e Setters
    public Long getIdContato() {
        return idContato;
    }

    public void setIdContato(Long idContato) {
        this.idContato = idContato;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}
