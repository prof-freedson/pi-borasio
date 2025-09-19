package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.Passageiro;
import com.borasio_back.backend.repository.PassageiroRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PassageiroService {

    private final PassageiroRepository passageiroRepository;

    public PassageiroService(PassageiroRepository passageiroRepository) {
        this.passageiroRepository = passageiroRepository;
    }

    public List<Passageiro> listarTodos() {
        return passageiroRepository.findAll();
    }

    public Optional<Passageiro> buscarPorId(Integer id) {
        return passageiroRepository.findById(id);
    }

    public Passageiro salvar(Passageiro passageiro) {
        return passageiroRepository.save(passageiro);
    }

    public void deletar(Integer id) {
        passageiroRepository.deleteById(id);
    }
}
