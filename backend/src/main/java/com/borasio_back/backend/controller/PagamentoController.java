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

    @GetMapping
    public ResponseEntity<List<PagamentoDTO>> listarTodos() {
        List<PagamentoDTO> lista = pagamentoService.listarTodos()
                .stream()
                .map(PagamentoDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PagamentoDTO> buscarPorId(@PathVariable Long id) {
        Pagamento pagamento = pagamentoService.buscarPorId(id);
        return ResponseEntity.ok(new PagamentoDTO(pagamento));
    }

    @PostMapping
    public ResponseEntity<PagamentoDTO> salvar(@RequestBody PagamentoDTO dto) {
        Pagamento pagamento = new Pagamento();
        pagamento.setValorPago(dto.getValorPago());
        pagamento.setDataPagamento(dto.getDataPagamento());
        pagamento.setMetodoPagamento(dto.getMetodoPagamento());
        pagamento.setStatus(dto.getStatus());

        // Aqui você deve setar a corrida antes de salvar
        Pagamento pagamentoSalvo = pagamentoService.salvar(pagamento);
        return ResponseEntity.ok(new PagamentoDTO(pagamentoSalvo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        pagamentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
