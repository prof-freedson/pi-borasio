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
    public List<Corrida> listarTodas() {
        return corridaService.listarTodas();
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
    public Corrida salvar(@RequestBody Corrida corrida) {
        return corridaService.salvar(corrida);
    }

    // Atualizar corrida existente
    @PutMapping("/{id}")
    public ResponseEntity<Corrida> atualizar(@PathVariable Integer id, @RequestBody Corrida corrida) {
        return corridaService.buscarPorId(id)
                .map(c -> {
                    corrida.setId(c.getId());
                    return ResponseEntity.ok(corridaService.salvar(corrida));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Deletar corrida por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        corridaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
