package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.Pagamento;
import com.borasio_back.backend.repository.PagamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagamentoService {

    private final PagamentoRepository pagamentoRepository;

    public PagamentoService(PagamentoRepository pagamentoRepository) {
        this.pagamentoRepository = pagamentoRepository;
    }

    public List<Pagamento> listarTodos() {
        return pagamentoRepository.findAll();
    }

    public Optional<Pagamento> buscarPorId(Integer id) {
        return pagamentoRepository.findById(id);
    }

    public Pagamento salvar(Pagamento pagamento) {
        return pagamentoRepository.save(pagamento);
    }

    public void deletar(Integer id) {
        pagamentoRepository.deleteById(id);
    }
}
