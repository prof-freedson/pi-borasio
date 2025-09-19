package com.borasio_back.backend.controller;

import com.borasio_back.backend.model.entity.Corrida;
import com.borasio_back.backend.service.CorridaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/corridas")
public class CorridaController {

    private final CorridaService corridaService;

    public CorridaController(CorridaService corridaService) {
        this.corridaService = corridaService;
    }

    // Listar todas as corridas
    @GetMapping
    public ResponseEntity<List<Corrida>> listarTodas() {
        List<Corrida> corridas = corridaService.listarTodas();
        return ResponseEntity.ok(corridas);
    }

    // Buscar corrida por ID
    @GetMapping("/{id}")
    public ResponseEntity<Corrida> buscarPorId(@PathVariable Integer id) {
        return corridaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Criar nova corrida
    @PostMapping
    public ResponseEntity<Corrida> criar(@RequestBody Corrida corrida) {
        Corrida salva = corridaService.salvar(corrida);
        return ResponseEntity.ok(salva);
    }

    // Atualizar status da corrida (exemplo simples)
    @PutMapping("/{id}/status")
    public ResponseEntity<Corrida> atualizarStatus(@PathVariable Integer id, @RequestParam String status) {
        return corridaService.buscarPorId(id)
                .map(corrida -> {
                    corrida.setStatus(status); // supondo que Corrida tenha setStatus
                    Corrida atualizada = corridaService.salvar(corrida);
                    return ResponseEntity.ok(atualizada);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Deletar corrida
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        corridaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}