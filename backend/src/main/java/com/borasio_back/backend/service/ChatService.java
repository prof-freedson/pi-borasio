package com.borasio_back.backend.service;

import com.borasio_back.backend.dto.ChatDTO;
import com.borasio_back.backend.model.entity.Chat;
import com.borasio_back.backend.model.entity.Usuario;
import com.borasio_back.backend.repository.ChatRepository;
import com.borasio_back.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Chat> listarTodos() {
        return chatRepository.findAll();
    }

    public Chat buscarPorId(Long id) {
        return chatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mensagem não encontrada com id: " + id));
    }

    public Chat salvar(ChatDTO dto) {
        if (dto.getUsuarioId() == null || dto.getMensagem() == null || dto.getMensagem().isBlank()) {
            throw new IllegalArgumentException("Campos obrigatórios da mensagem não foram informados");
        }

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        Chat chat = new Chat();
        chat.setUsuario(usuario);
        chat.setMensagem(dto.getMensagem());

        // `dataEnvio` já é setado automaticamente no @PrePersist da entidade
        return chatRepository.save(chat);
    }

    public void deletar(Long id) {
        chatRepository.deleteById(id);
    }
}
