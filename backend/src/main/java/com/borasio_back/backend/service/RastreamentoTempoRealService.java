package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.RastreamentoTempoReal;
import com.borasio_back.backend.repository.RastreamentoTempoRealRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RastreamentoTempoRealService {

    private final RastreamentoTempoRealRepository rastreamentoTempoRealRepository;

    public RastreamentoTempoRealService(RastreamentoTempoRealRepository rastreamentoTempoRealRepository) {
        this.rastreamentoTempoRealRepository = rastreamentoTempoRealRepository;
    }

    public List<RastreamentoTempoReal> listarTodos() {
        return rastreamentoTempoRealRepository.findAll();
    }

    public Optional<RastreamentoTempoReal> buscarPorId(Integer id) {
        return rastreamentoTempoRealRepository.findById(id);
    }

    public RastreamentoTempoReal salvar(RastreamentoTempoReal rastreamento) {
        return rastreamentoTempoRealRepository.save(rastreamento);
    }

    public void deletar(Integer id) {
        rastreamentoTempoRealRepository.deleteById(id);
    }
}
