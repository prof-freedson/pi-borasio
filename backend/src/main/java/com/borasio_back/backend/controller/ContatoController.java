package com.borasio_back.backend.controller;

import com.borasio_back.backend.model.entity.Contato;
import com.borasio_back.backend.service.ContatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/contatos")
@CrossOrigin(origins = "*") // ou restrinja ao seu domínio
public class ContatoController {

    @Autowired
    private ContatoService contatoService;

    @GetMapping
    public ResponseEntity<List<Contato>> listarTodos() {
        return ResponseEntity.ok(contatoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contato> buscarPorId(@PathVariable Long id) {
        return contatoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Contato>> buscarPorUsuario(@PathVariable Long idUsuario) {
        return ResponseEntity.ok(contatoService.buscarPorUsuario(idUsuario));
    }

    @PostMapping
    public ResponseEntity<Contato> criar(@RequestBody Contato contato) {
        return ResponseEntity.ok(contatoService.salvar(contato));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contato> atualizar(@PathVariable Long id, @RequestBody Contato contato) {
        return ResponseEntity.ok(contatoService.atualizar(id, contato));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        contatoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
