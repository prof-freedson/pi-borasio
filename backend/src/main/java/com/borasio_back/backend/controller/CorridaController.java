package com.borasio_back.backend.controller;

import com.borasio_back.backend.dto.CorridaDTO;
import com.borasio_back.backend.model.entity.Corrida;
import com.borasio_back.backend.model.entity.Motorista;
import com.borasio_back.backend.model.entity.Passageiro;
import com.borasio_back.backend.service.CorridaService;
import com.borasio_back.backend.service.MotoristaService;
import com.borasio_back.backend.service.PassageiroService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/corridas")
public class CorridaController {

    private final CorridaService corridaService;
    private final PassageiroService passageiroService;
    private final MotoristaService motoristaService;

    public CorridaController(CorridaService corridaService,
                             PassageiroService passageiroService,
                             MotoristaService motoristaService) {
        this.corridaService = corridaService;
        this.passageiroService = passageiroService;
        this.motoristaService = motoristaService;
    }

    // Listar todas as corridas
    @GetMapping
    public List<CorridaDTO> listarTodas() {
        return corridaService.listarTodas().stream()
                .map(CorridaDTO::new)
                .collect(Collectors.toList());
    }

    // Buscar corrida por ID
    @GetMapping("/{id}")
    public ResponseEntity<CorridaDTO> buscarPorId(@PathVariable Long id) {
        return corridaService.buscarPorId(id)
                .map(CorridaDTO::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Criar nova corrida
    @PostMapping
    public ResponseEntity<CorridaDTO> salvar(@RequestBody CorridaDTO dto) {
        Passageiro passageiro = passageiroService.buscarPorId(dto.getPassageiroId())
                .orElseThrow(() -> new RuntimeException("Passageiro não encontrado"));
        Motorista motorista = motoristaService.buscarPorId(dto.getMotoristaId())
                .orElseThrow(() -> new RuntimeException("Motorista não encontrado"));

        Corrida corrida = Corrida.builder()
                .passageiro(passageiro)
                .motorista(motorista)
                .origem(dto.getOrigem())
                .destino(dto.getDestino())
                .dataCorrida(dto.getDataCorrida())
                .status(Corrida.StatusCorrida.fromString(dto.getStatus().toString()))
                .valor(dto.getValor())
                .build(); // id não definido

        Corrida salvo = corridaService.salvar(corrida);
        return ResponseEntity.ok(new CorridaDTO(salvo));
    }

    // Atualizar corrida existente
    @PutMapping("/{id}")
    public ResponseEntity<CorridaDTO> atualizar(@PathVariable Long id, @RequestBody CorridaDTO dto) {
        return corridaService.buscarPorId(id)
                .map(c -> {
                    Passageiro passageiro = passageiroService.buscarPorId(dto.getPassageiroId())
                            .orElseThrow(() -> new RuntimeException("Passageiro não encontrado"));
                    Motorista motorista = motoristaService.buscarPorId(dto.getMotoristaId())
                            .orElseThrow(() -> new RuntimeException("Motorista não encontrado"));

                    c.setPassageiro(passageiro);
                    c.setMotorista(motorista);
                    c.setOrigem(dto.getOrigem());
                    c.setDestino(dto.getDestino());
                    c.setDataCorrida(dto.getDataCorrida());
                    c.setStatus(Corrida.StatusCorrida.fromString(dto.getStatus().toString()));
                    c.setValor(dto.getValor());

                    Corrida atualizado = corridaService.salvar(c);
                    return ResponseEntity.ok(new CorridaDTO(atualizado));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Deletar corrida por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (corridaService.buscarPorId(id).isPresent()) {
            corridaService.deletar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
