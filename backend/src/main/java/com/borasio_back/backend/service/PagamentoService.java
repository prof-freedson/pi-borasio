package com.borasio_back.backend.service;

import com.borasio_back.backend.dto.PagamentoDTO;
import com.borasio_back.backend.model.entity.Corrida;
import com.borasio_back.backend.model.entity.Pagamento;
import com.borasio_back.backend.model.entity.Pagamento.StatusPagamento;
import com.borasio_back.backend.repository.CorridaRepository;
import com.borasio_back.backend.repository.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    @Autowired
    private CorridaRepository corridaRepository;

    public List<Pagamento> listarTodos() {
        return pagamentoRepository.findAll();
    }

    public Pagamento buscarPorId(Long id) {
        Optional<Pagamento> pagamento = pagamentoRepository.findById(id);
        return pagamento.orElseThrow(() -> new RuntimeException("Pagamento não encontrado com id: " + id));
    }

    public Pagamento salvar(PagamentoDTO dto) {
        if (dto.getCorridaId() == null || dto.getValorPago() == null || dto.getMetodoPagamento() == null) {
            throw new IllegalArgumentException("Campos obrigatórios do pagamento não foram informados");
        }

        Pagamento pagamento = new Pagamento();

        // Corrida vinculada ao pagamento
        Corrida corrida = corridaRepository.findById(dto.getCorridaId())
                .orElseThrow(() -> new IllegalArgumentException("Corrida não encontrada"));
        pagamento.setCorrida(corrida);

        pagamento.setValorPago(dto.getValorPago());
        pagamento.setMetodoPagamento(dto.getMetodoPagamento());

        // status padrão
        pagamento.setStatus(dto.getStatus() != null ? dto.getStatus() : StatusPagamento.PENDENTE);

        // data de pagamento
        pagamento.setDataPagamento(dto.getDataPagamento() != null ? dto.getDataPagamento() : LocalDateTime.now());

        return pagamentoRepository.save(pagamento);
    }

    public Pagamento atualizar(Long id, PagamentoDTO dto) {
        Pagamento pagamentoExistente = buscarPorId(id);

        if (dto.getValorPago() != null) {
            pagamentoExistente.setValorPago(dto.getValorPago());
        }
        if (dto.getMetodoPagamento() != null) {
            pagamentoExistente.setMetodoPagamento(dto.getMetodoPagamento());
        }
        if (dto.getStatus() != null) {
            pagamentoExistente.setStatus(dto.getStatus());
        }
        if (dto.getDataPagamento() != null) {
            pagamentoExistente.setDataPagamento(dto.getDataPagamento());
        }

        return pagamentoRepository.save(pagamentoExistente);
    }

    public void deletar(Long id) {
        pagamentoRepository.deleteById(id);
    }
}
