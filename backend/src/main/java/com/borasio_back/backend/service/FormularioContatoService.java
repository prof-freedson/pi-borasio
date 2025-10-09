package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.FormularioContato;
import com.borasio_back.backend.repository.FormularioContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FormularioContatoService {
    @Autowired
    private FormularioContatoRepository formularioContatoRepository;

    public FormularioContato salvar(FormularioContato formularioContato) {
        return formularioContatoRepository.save(formularioContato);
    }

    public List<FormularioContato> listarTodos() {
        return formularioContatoRepository.findAll();
    }

    public Optional<FormularioContato> buscarPorId(Integer id) {
        return formularioContatoRepository.findById(id);
    }

    public void deletar(Integer id) {
        formularioContatoRepository.deleteById(id);
    }
}
