package com.borasio_back.backend.controller;

import com.borasio_back.backend.model.entity.EventoCultural;
import com.borasio_back.backend.service.EventoCulturalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/evento-cultural")
public class EventoCulturalController {

    private final EventoCulturalService service;

    public EventoCulturalController(EventoCulturalService service) {
        this.service = service;
    }

    @GetMapping
    public List<EventoCultural> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoCultural> buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public EventoCultural salvar(@RequestBody EventoCultural evento) {
        return service.salvar(evento);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
