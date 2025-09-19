package com.borasio_back.backend.controller;

import com.borasio_back.backend.model.entity.TerminalRural;
import com.borasio_back.backend.service.TerminalRuralService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/terminal-rural")
public class TerminalRuralController {

    private final TerminalRuralService service;

    public TerminalRuralController(TerminalRuralService service) {
        this.service = service;
    }

    @GetMapping
    public List<TerminalRural> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TerminalRural> buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TerminalRural salvar(@RequestBody TerminalRural terminal) {
        return service.salvar(terminal);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
