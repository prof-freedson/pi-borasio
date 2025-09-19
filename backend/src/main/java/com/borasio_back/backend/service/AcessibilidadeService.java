package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.Acessibilidade;
import com.borasio_back.backend.repository.AcessibilidadeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AcessibilidadeService {

    private final AcessibilidadeRepository acessibilidadeRepository;

    public AcessibilidadeService(AcessibilidadeRepository acessibilidadeRepository) {
        this.acessibilidadeRepository = acessibilidadeRepository;
    }

    public List<Acessibilidade> listarTodas() {
        return acessibilidadeRepository.findAll();
    }

    public Optional<Acessibilidade> buscarPorId(Integer id) {
        return acessibilidadeRepository.findById(id);
    }

    public Acessibilidade salvar(Acessibilidade acessibilidade) {
        return acessibilidadeRepository.save(acessibilidade);
    }

    public void deletar(Integer id) {
        acessibilidadeRepository.deleteById(id);
    }
}
