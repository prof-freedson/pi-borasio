package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.Administrador;
import com.borasio_back.backend.repository.AdministradorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministradorService {

    private final AdministradorRepository administradorRepository;

    public AdministradorService(AdministradorRepository administradorRepository) {
        this.administradorRepository = administradorRepository;
    }

    public List<Administrador> listarTodos() {
        return administradorRepository.findAll();
    }

    public Optional<Administrador> buscarPorId(Integer id) {
        return administradorRepository.findById(id);
    }

    public Administrador salvar(Administrador administrador) {
        return administradorRepository.save(administrador);
    }

    public void deletar(Integer id) {
        administradorRepository.deleteById(id);
    }
}
