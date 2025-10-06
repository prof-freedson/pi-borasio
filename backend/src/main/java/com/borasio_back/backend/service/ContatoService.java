package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.Contato;
import com.borasio_back.backend.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ContatoService {

    @Autowired
    private ContatoRepository contatoRepository;

    public List<Contato> listarTodos() {
        return contatoRepository.findAll();
    }

    public Optional<Contato> buscarPorId(Long id) {
        return contatoRepository.findById(id);
    }

    public List<Contato> buscarPorUsuario(Long idUsuario) {
        return contatoRepository.findByIdUsuario(idUsuario);
    }

    public Contato salvar(Contato contato) {
        return contatoRepository.save(contato);
    }

    public Contato atualizar(Long id, Contato contatoAtualizado) {
        return contatoRepository.findById(id)
                .map(contato -> {
                    contato.setDescricao(contatoAtualizado.getDescricao());
                    return contatoRepository.save(contato);
                })
                .orElseThrow(() -> new RuntimeException("Contato não encontrado"));
    }

    public void deletar(Long id) {
        if (!contatoRepository.existsById(id)) {
            throw new RuntimeException("Contato não encontrado");
        }
        contatoRepository.deleteById(id);
    }
}
