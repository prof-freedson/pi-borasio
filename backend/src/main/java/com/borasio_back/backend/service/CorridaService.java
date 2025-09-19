package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.Corrida;
import com.borasio_back.backend.repository.CorridaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CorridaService {

    private final CorridaRepository corridaRepository;

    public CorridaService(CorridaRepository corridaRepository) {
        this.corridaRepository = corridaRepository;
    }

    public List<Corrida> listarTodas() {
        return corridaRepository.findAll();
    }

    public Optional<Corrida> buscarPorId(Integer id) {
        return corridaRepository.findById(id);
    }

    public Corrida salvar(Corrida corrida) {
        return corridaRepository.save(corrida);
    }

    public void deletar(Integer id) {
        corridaRepository.deleteById(id);
    }
}
