package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.EventoSistema;
import com.borasio_back.backend.repository.EventoSistemaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoSistemaService {

    private final EventoSistemaRepository eventoSistemaRepository;

    public EventoSistemaService(EventoSistemaRepository eventoSistemaRepository) {
        this.eventoSistemaRepository = eventoSistemaRepository;
    }

    public List<EventoSistema> listarTodos() {
        return eventoSistemaRepository.findAll();
    }

    public Optional<EventoSistema> buscarPorId(Integer id) {
        return eventoSistemaRepository.findById(id);
    }

    public EventoSistema salvar(EventoSistema evento) {
        return eventoSistemaRepository.save(evento);
    }

    public void deletar(Integer id) {
        eventoSistemaRepository.deleteById(id);
    }
}
