package com.borasio_back.backend.controller;

import com.borasio_back.backend.dto.MotoristaDTO;
import com.borasio_back.backend.model.entity.Motorista;
import com.borasio_back.backend.model.entity.Usuario;
import com.borasio_back.backend.service.MotoristaService;
import com.borasio_back.backend.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/motoristas")
public class MotoristaController {

    private final MotoristaService motoristaService;
    private final UsuarioService usuarioService;

    public MotoristaController(MotoristaService motoristaService, UsuarioService usuarioService) {
        this.motoristaService = motoristaService;
        this.usuarioService = usuarioService;
    }

    // Listar todos os motoristas
    @GetMapping
    public List<MotoristaDTO> listarTodos() {
        return motoristaService.listarTodos().stream()
                .map(MotoristaDTO::new)
                .collect(Collectors.toList());
    }

    // Buscar motorista por ID
    @GetMapping("/{id}")
    public ResponseEntity<MotoristaDTO> buscarPorId(@PathVariable Long id) {
        return motoristaService.buscarPorId(id)
                .map(MotoristaDTO::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Salvar novo motorista
    @PostMapping
    public ResponseEntity<MotoristaDTO> salvar(@RequestBody MotoristaDTO dto) {
        Usuario usuario = usuarioService.buscarPorId(dto.getUsuarioId());
        if (usuario == null) {
            return ResponseEntity.badRequest().build();
        }
        Motorista motorista = Motorista.builder()
                .usuario(usuario)
                .cnh(dto.getCnh())
                .placa(dto.getPlaca())
                .marca(dto.getMarca())
                .modelo(dto.getModelo())
                .cor(dto.getCor())
                .arCondicionado(dto.getArCondicionado())
                .combustivel(dto.getCombustivel())
                .assentos(dto.getAssentos())
                .telefone(dto.getTelefone())
                .endereco(dto.getEndereco())
                .build();
        Motorista salvo = motoristaService.salvar(motorista);
        return ResponseEntity.ok(new MotoristaDTO(salvo));
    }

    // Atualizar motorista existente
    @PutMapping("/{id}")
    public ResponseEntity<MotoristaDTO> atualizar(@PathVariable Long id, @RequestBody MotoristaDTO dto) {
        return motoristaService.buscarPorId(id)
                .map(motorista -> {
                    motorista.setCnh(dto.getCnh());
                    motorista.setPlaca(dto.getPlaca());
                    motorista.setMarca(dto.getMarca());
                    motorista.setModelo(dto.getModelo());
                    motorista.setCor(dto.getCor());
                    motorista.setArCondicionado(dto.getArCondicionado());
                    motorista.setCombustivel(dto.getCombustivel());
                    motorista.setAssentos(dto.getAssentos());
                    motorista.setTelefone(dto.getTelefone());
                    motorista.setEndereco(dto.getEndereco());
                    Motorista atualizado = motoristaService.salvar(motorista);
                    return ResponseEntity.ok(new MotoristaDTO(atualizado));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Deletar motorista
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return motoristaService.buscarPorId(id)
                .map(motorista -> {
                    motoristaService.deletar(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
