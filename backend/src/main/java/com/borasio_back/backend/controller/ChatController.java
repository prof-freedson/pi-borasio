package com.borasio_back.backend.controller;

import com.borasio_back.backend.dto.ChatDTO;
import com.borasio_back.backend.model.entity.Chat;
import com.borasio_back.backend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<ChatDTO> salvar(@RequestBody ChatDTO dto) {
        Chat chat = chatService.salvar(dto);
        return ResponseEntity.ok(new ChatDTO(chat));
    }

    @GetMapping
    public ResponseEntity<List<ChatDTO>> listar() {
        List<ChatDTO> chats = chatService.listarTodos().stream()
                .map(ChatDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(chats);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChatDTO> buscarPorId(@PathVariable Long id) {
        Chat chat = chatService.buscarPorId(id);
        return ResponseEntity.ok(new ChatDTO(chat));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        chatService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
