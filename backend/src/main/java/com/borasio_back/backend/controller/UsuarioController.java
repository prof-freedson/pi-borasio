package com.borasio_back.backend.controller;

import com.borasio_back.backend.model.entity.Usuario;
import com.borasio_back.backend.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        List<Usuario> usuarios = service.listarTodos();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        Usuario usuario = service.buscarPorId(id);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping
    public ResponseEntity<Usuario> salvar(@RequestBody Usuario usuario) {
        Usuario usuarioSalvo = service.salvar(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        Usuario u = service.buscarPorId(id); // Throws exception if not found
        u.setNome(usuario.getNome());
        u.setEmail(usuario.getEmail());
        
        // Só atualiza a senha se foi fornecida uma nova
        if (usuario.getSenha() != null && !usuario.getSenha().trim().isEmpty()) {
            u.setSenha(usuario.getSenha());
        }
        
        // Atualiza o tipo se necessário
        if (usuario.getTipo() != null) {
            u.setTipo(usuario.getTipo());
        }
        
        Usuario usuarioAtualizado = service.salvar(u);
        return ResponseEntity.ok(usuarioAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.buscarPorId(id); // Throws exception if not found, ensuring user exists
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}