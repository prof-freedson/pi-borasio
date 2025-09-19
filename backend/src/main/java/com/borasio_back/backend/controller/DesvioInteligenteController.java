package com.borasio_back.backend.controller;

import com.borasio_back.backend.model.entity.DesvioInteligente;
import com.borasio_back.backend.service.DesvioInteligenteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/desvio-inteligente")
public class DesvioInteligenteController {

    private final DesvioInteligenteService service;

    public DesvioInteligenteController(DesvioInteligenteService service) {
        this.service = service;
    }

    @GetMapping
    public List<DesvioInteligente> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DesvioInteligente> buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public DesvioInteligente salvar(@RequestBody DesvioInteligente desvio) {
        return service.salvar(desvio);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
