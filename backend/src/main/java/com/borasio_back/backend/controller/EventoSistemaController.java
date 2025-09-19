package com.borasio_back.backend.controller;

import com.borasio_back.backend.model.entity.EventoSistema;
import com.borasio_back.backend.service.EventoSistemaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/evento-sistema")
public class EventoSistemaController {

    private final EventoSistemaService service;

    public EventoSistemaController(EventoSistemaService service) {
        this.service = service;
    }

    @GetMapping
    public List<EventoSistema> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoSistema> buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public EventoSistema salvar(@RequestBody EventoSistema evento) {
        return service.salvar(evento);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
