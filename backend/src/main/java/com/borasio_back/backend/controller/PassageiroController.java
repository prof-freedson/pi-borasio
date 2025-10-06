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
        // Ajuste: buscarPorId deve retornar Optional<Usuario>
        // Se não retornar, adapte conforme o retorno real do método
        var usuario = usuarioService.buscarPorId(dto.getUsuarioId());
        if (usuario != null) {
            Passageiro passageiro = Passageiro.builder()
                    .usuario(usuario)
                    .cpf(dto.getCpf())
                    .endereco(dto.getEndereco())
                    .telefone(dto.getTelefone())
                    .preferencias(dto.getPreferencias())
                    .build();
            Passageiro salvo = passageiroService.salvar(passageiro);
            return ResponseEntity.ok(new PassageiroDTO(salvo));
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PassageiroDTO> atualizar(@PathVariable Long id, @RequestBody PassageiroDTO dto) {
        return passageiroService.buscarPorId(id)
                .map(passageiro -> {
                    passageiro.setCpf(dto.getCpf());
                    passageiro.setEndereco(dto.getEndereco());
                    passageiro.setTelefone(dto.getTelefone());
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
