package com.borasio_back.backend.dto;

import com.borasio_back.backend.model.entity.Chat;
import java.time.LocalDateTime;

public class ChatDTO {

    private Long id;
    private Long usuarioId;
    private String mensagem;
    private LocalDateTime dataEnvio;

    public ChatDTO() {}

    public ChatDTO(Chat chat) {
        if (chat != null) {
            this.id = chat.getId();
            this.usuarioId = chat.getUsuario().getId();
            this.mensagem = chat.getMensagem();
            this.dataEnvio = chat.getDataEnvio();
        }
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }

    public LocalDateTime getDataEnvio() { return dataEnvio; }
    public void setDataEnvio(LocalDateTime dataEnvio) { this.dataEnvio = dataEnvio; }
}
