package com.borasio_back.backend.controller;

import com.borasio_back.backend.model.entity.Avaliacao;
import com.borasio_back.backend.service.AvaliacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

    public AvaliacaoController(AvaliacaoService avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    // Listar todas as avaliações
    @GetMapping
    public ResponseEntity<List<Avaliacao>> listarTodas() {
        List<Avaliacao> avaliacoes = avaliacaoService.listarTodas();
        return ResponseEntity.ok(avaliacoes);
    }

    // Buscar avaliação por ID
    @GetMapping("/{id}")
    public ResponseEntity<Avaliacao> buscarPorId(@PathVariable Integer id) {
        return avaliacaoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Salvar nova avaliação
    @PostMapping
    public ResponseEntity<Avaliacao> salvar(@RequestBody Avaliacao avaliacao) {
        Avaliacao salva = avaliacaoService.salvar(avaliacao);
        return ResponseEntity.ok(salva);
    }

    // Deletar avaliação por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        avaliacaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
