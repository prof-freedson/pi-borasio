package com.borasio_back.backend.controller;

import com.borasio_back.backend.model.entity.RastreamentoTempoReal;
import com.borasio_back.backend.service.RastreamentoTempoRealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rastreamento-tempo-real")
public class RastreamentoTempoRealController {

    private final RastreamentoTempoRealService service;

    public RastreamentoTempoRealController(RastreamentoTempoRealService service) {
        this.service = service;
    }

    @GetMapping
    public List<RastreamentoTempoReal> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RastreamentoTempoReal> buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public RastreamentoTempoReal salvar(@RequestBody RastreamentoTempoReal rastreamento) {
        return service.salvar(rastreamento);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
