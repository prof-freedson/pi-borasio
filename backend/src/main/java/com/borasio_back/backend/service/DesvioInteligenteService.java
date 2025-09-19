package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.DesvioInteligente;
import com.borasio_back.backend.repository.DesvioInteligenteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DesvioInteligenteService {

    private final DesvioInteligenteRepository desvioInteligenteRepository;

    public DesvioInteligenteService(DesvioInteligenteRepository desvioInteligenteRepository) {
        this.desvioInteligenteRepository = desvioInteligenteRepository;
    }

    public List<DesvioInteligente> listarTodos() {
        return desvioInteligenteRepository.findAll();
    }

    public Optional<DesvioInteligente> buscarPorId(Integer id) {
        return desvioInteligenteRepository.findById(id);
    }

    public DesvioInteligente salvar(DesvioInteligente desvio) {
        return desvioInteligenteRepository.save(desvio);
    }

    public void deletar(Integer id) {
        desvioInteligenteRepository.deleteById(id);
    }
}
