package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.Chat;
import com.borasio_back.backend.repository.ChatRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    private final ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    public List<Chat> listarTodos() {
        return chatRepository.findAll();
    }

    public Optional<Chat> buscarPorId(Integer id) {
        return chatRepository.findById(id);
    }

    public Chat salvar(Chat chat) {
        return chatRepository.save(chat);
    }

    public void deletar(Integer id) {
        chatRepository.deleteById(id);
    }
}
