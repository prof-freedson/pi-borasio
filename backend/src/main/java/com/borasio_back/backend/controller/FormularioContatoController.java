package com.borasio_back.backend.controller;

import com.borasio_back.backend.model.entity.FormularioContato;
import com.borasio_back.backend.service.FormularioContatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/formulario-contato")
@CrossOrigin(origins = "*", allowCredentials = "false")
public class FormularioContatoController {
    @Autowired
    private FormularioContatoService formularioContatoService;

    @PostMapping
    public ResponseEntity<FormularioContato> criar(@RequestBody FormularioContato formularioContato) {
        FormularioContato salvo = formularioContatoService.salvar(formularioContato);
        return new ResponseEntity<>(salvo, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FormularioContato>> listarTodos() {
        return ResponseEntity.ok(formularioContatoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FormularioContato> buscarPorId(@PathVariable Integer id) {
        return formularioContatoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        formularioContatoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
