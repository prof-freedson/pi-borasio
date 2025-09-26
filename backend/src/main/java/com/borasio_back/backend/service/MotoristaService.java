package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.Motorista;
import com.borasio_back.backend.repository.MotoristaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MotoristaService {

    private final MotoristaRepository motoristaRepository;

    public MotoristaService(MotoristaRepository motoristaRepository) {
        this.motoristaRepository = motoristaRepository;
    }

    public List<Motorista> listarTodos() {
        return motoristaRepository.findAll();
    }

    public Optional<Motorista> buscarPorId(Long id) {
        return motoristaRepository.findById(id);
    }

    public Motorista salvar(Motorista motorista) {
        return motoristaRepository.save(motorista);
    }

    public void deletar(Long id) {
        motoristaRepository.deleteById(id);
    }
}
