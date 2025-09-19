package com.borasio_back.backend.controller;

import com.borasio_back.backend.model.entity.Acessibilidade;
import com.borasio_back.backend.service.AcessibilidadeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/acessibilidade")
public class AcessibilidadeController {

    private final AcessibilidadeService service;

    public AcessibilidadeController(AcessibilidadeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Acessibilidade> listarTodas() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Acessibilidade> buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Acessibilidade salvar(@RequestBody Acessibilidade acessibilidade) {
        return service.salvar(acessibilidade);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
