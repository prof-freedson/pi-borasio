package com.borasio_back.backend.service;

import com.borasio_back.backend.model.entity.Notificacao;
import com.borasio_back.backend.repository.NotificacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificacaoService {

    private final NotificacaoRepository notificacaoRepository;

    public NotificacaoService(NotificacaoRepository notificacaoRepository) {
        this.notificacaoRepository = notificacaoRepository;
    }

    public List<Notificacao> listarTodas() {
        return notificacaoRepository.findAll();
    }

    public Optional<Notificacao> buscarPorId(Integer id) {
        return notificacaoRepository.findById(id);
    }

    public Notificacao salvar(Notificacao notificacao) {
        return notificacaoRepository.save(notificacao);
    }

    public void deletar(Integer id) {
        notificacaoRepository.deleteById(id);
    }
}
