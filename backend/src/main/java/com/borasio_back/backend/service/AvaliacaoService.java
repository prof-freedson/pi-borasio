package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.Avaliacao;
import com.borasio_back.backend.repository.AvaliacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AvaliacaoService {

    private final AvaliacaoRepository avaliacaoRepository;

    public AvaliacaoService(AvaliacaoRepository avaliacaoRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
    }

    public List<Avaliacao> listarTodas() {
        return avaliacaoRepository.findAll();
    }

    public Optional<Avaliacao> buscarPorId(Integer id) {
        return avaliacaoRepository.findById(id);
    }

    public Avaliacao salvar(Avaliacao avaliacao) {
        return avaliacaoRepository.save(avaliacao);
    }

    public void deletar(Integer id) {
        avaliacaoRepository.deleteById(id);
    }
}
