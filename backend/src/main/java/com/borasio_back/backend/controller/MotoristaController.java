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
    private final UsuarioService usuarioService; // Para buscar o usuário

    public MotoristaController(MotoristaService motoristaService, UsuarioService usuarioService) {
        this.motoristaService = motoristaService;
        this.usuarioService = usuarioService;
    }

    // Listar todos os motoristas como DTO
    @GetMapping
    public List<MotoristaDTO> listarTodos() {
        return motoristaService.listarTodos().stream()
                .map(MotoristaDTO::new)
                .collect(Collectors.toList());
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<MotoristaDTO> buscarPorId(@PathVariable Long id) {
        return motoristaService.buscarPorId(id)
                .map(MotoristaDTO::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Salvar motorista
    @PostMapping
    public ResponseEntity<MotoristaDTO> salvar(@RequestBody MotoristaDTO dto) {
        // Verifica se o usuário existe
        Usuario usuario = usuarioService.buscarPorId(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Cria a entidade Motorista
        Motorista motorista = Motorista.builder()
                .usuario(usuario)
                .cnh(dto.getCnh())
                .veiculo(dto.getVeiculo())
                .marca(dto.getMarca())
                .modelo(dto.getModelo())
                .cor(dto.getCor())
                .arCondicionado(dto.getArCondicionado())
                .combustivel(dto.getCombustivel())
                .assentos(dto.getAssentos())
                .build();

        Motorista salvo = motoristaService.salvar(motorista);
        return ResponseEntity.ok(new MotoristaDTO(salvo));
    }

    // Deletar motorista
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (motoristaService.buscarPorId(id).isPresent()) {
            motoristaService.deletar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
