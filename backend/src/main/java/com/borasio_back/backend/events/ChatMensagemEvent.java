package com.borasio_back.backend.events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMensagemEvent {
    private Long idChat;
    private Long idRemetente;
    private Long idDestinatario;
    private String mensagem;
}
