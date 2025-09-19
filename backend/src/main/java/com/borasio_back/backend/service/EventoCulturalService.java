package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.EventoCultural;
import com.borasio_back.backend.repository.EventoCulturalRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoCulturalService {

    private final EventoCulturalRepository eventoCulturalRepository;

    public EventoCulturalService(EventoCulturalRepository eventoCulturalRepository) {
        this.eventoCulturalRepository = eventoCulturalRepository;
    }

    public List<EventoCultural> listarTodos() {
        return eventoCulturalRepository.findAll();
    }

    public Optional<EventoCultural> buscarPorId(Integer id) {
        return eventoCulturalRepository.findById(id);
    }

    public EventoCultural salvar(EventoCultural evento) {
        return eventoCulturalRepository.save(evento);
    }

    public void deletar(Integer id) {
        eventoCulturalRepository.deleteById(id);
    }
}
