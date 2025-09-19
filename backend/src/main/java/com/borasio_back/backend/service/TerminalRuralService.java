package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.TerminalRural;
import com.borasio_back.backend.repository.TerminalRuralRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TerminalRuralService {

    private final TerminalRuralRepository terminalRuralRepository;

    public TerminalRuralService(TerminalRuralRepository terminalRuralRepository) {
        this.terminalRuralRepository = terminalRuralRepository;
    }

    public List<TerminalRural> listarTodos() {
        return terminalRuralRepository.findAll();
    }

    public Optional<TerminalRural> buscarPorId(Integer id) {
        return terminalRuralRepository.findById(id);
    }

    public TerminalRural salvar(TerminalRural terminal) {
        return terminalRuralRepository.save(terminal);
    }

    public void deletar(Integer id) {
        terminalRuralRepository.deleteById(id);
    }
}
