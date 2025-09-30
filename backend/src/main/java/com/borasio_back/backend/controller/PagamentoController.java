package com.borasio_back.backend.controller;

import com.borasio_back.backend.dto.PagamentoDTO;
import com.borasio_back.backend.model.entity.Pagamento;
import com.borasio_back.backend.service.PagamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pagamentos")
public class PagamentoController {

    @Autowired
    private PagamentoService pagamentoService;

    // Criar/Salvar pagamento
    @PostMapping
    public ResponseEntity<PagamentoDTO> salvar(@RequestBody PagamentoDTO dto) {
        Pagamento pagamento = pagamentoService.salvar(dto);
        return ResponseEntity.ok(new PagamentoDTO(pagamento));
    }

    // Buscar todos os pagamentos
    @GetMapping
    public ResponseEntity<List<PagamentoDTO>> listar() {
        List<Pagamento> pagamentos = pagamentoService.listarTodos();
        List<PagamentoDTO> dtos = pagamentos.stream()
                .map(PagamentoDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // Buscar pagamento por ID
    @GetMapping("/{id}")
    public ResponseEntity<PagamentoDTO> buscarPorId(@PathVariable Long id) {
        Pagamento pagamento = pagamentoService.buscarPorId(id);
        return ResponseEntity.ok(new PagamentoDTO(pagamento));
    }

    // Atualizar pagamento
    @PutMapping("/{id}")
    public ResponseEntity<PagamentoDTO> atualizar(@PathVariable Long id, @RequestBody PagamentoDTO dto) {
        Pagamento pagamento = pagamentoService.atualizar(id, dto);
        return ResponseEntity.ok(new PagamentoDTO(pagamento));
    }

    // Deletar pagamento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        pagamentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
