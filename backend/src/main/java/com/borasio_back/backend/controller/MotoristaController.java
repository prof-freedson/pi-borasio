package com.borasio_back.backend.controller;

import com.borasio_back.backend.model.entity.Motorista;
import com.borasio_back.backend.service.MotoristaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/motorista")
public class MotoristaController {

    private final MotoristaService service;

    public MotoristaController(MotoristaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Motorista> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Motorista> buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Motorista salvar(@RequestBody Motorista motorista) {
        return service.salvar(motorista);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
