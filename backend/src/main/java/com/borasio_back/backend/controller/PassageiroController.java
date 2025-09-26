package com.borasio_back.backend.controller;

import com.borasio_back.backend.dto.PassageiroDTO;
import com.borasio_back.backend.model.entity.Passageiro;
import com.borasio_back.backend.service.PassageiroService;
import com.borasio_back.backend.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/passageiros")
public class PassageiroController {

    private final PassageiroService passageiroService;
    private final UsuarioService usuarioService;

    public PassageiroController(PassageiroService passageiroService, UsuarioService usuarioService) {
        this.passageiroService = passageiroService;
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<PassageiroDTO> listarTodos() {
        return passageiroService.listarTodos()
                .stream()
                .map(PassageiroDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PassageiroDTO> buscarPorId(@PathVariable Long id) {
        return passageiroService.buscarPorId(id)
                .map(PassageiroDTO::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PassageiroDTO> salvar(@RequestBody PassageiroDTO dto) {
        return usuarioService.buscarPorId(dto.getUsuarioId())
                .map(usuario -> {
                    Passageiro passageiro = Passageiro.builder()
                            .usuario(usuario)
                            .preferencias(dto.getPreferencias())
                            .build();
                    Passageiro salvo = passageiroService.salvar(passageiro);
                    return ResponseEntity.ok(new PassageiroDTO(salvo));
                })
                .orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PassageiroDTO> atualizar(@PathVariable Long id, @RequestBody PassageiroDTO dto) {
        return passageiroService.buscarPorId(id)
                .map(passageiro -> {
                    passageiro.setPreferencias(dto.getPreferencias());
                    Passageiro atualizado = passageiroService.salvar(passageiro);
                    return ResponseEntity.ok(new PassageiroDTO(atualizado));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return passageiroService.buscarPorId(id)
                .map(passageiro -> {
                    passageiroService.deletar(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
