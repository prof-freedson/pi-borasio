package com.borasio_back.backend.repository;

import com.borasio_back.backend.model.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContatoRepository extends JpaRepository<Contato, Long> {
    List<Contato> findByIdUsuario(Long idUsuario);
}
