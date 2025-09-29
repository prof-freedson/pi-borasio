package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.Pagamento;
import com.borasio_back.backend.repository.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    public List<Pagamento> listarTodos() {
        return pagamentoRepository.findAll();
    }

    public Pagamento buscarPorId(Long id) {
        Optional<Pagamento> pagamento = pagamentoRepository.findById(id);
        return pagamento.orElseThrow(() -> new RuntimeException("Pagamento não encontrado com id: " + id));
    }

    public Pagamento salvar(Pagamento pagamento) {
        if (pagamento.getCorrida() == null || pagamento.getValorPago() == null || pagamento.getStatus() == null || pagamento.getMetodoPagamento() == null) {
            throw new IllegalArgumentException("Campos obrigatórios do pagamento não foram informados");
        }
        return pagamentoRepository.save(pagamento);
    }

    public void deletar(Long id) {
        pagamentoRepository.deleteById(id);
    }
}
