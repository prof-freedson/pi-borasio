package com.borasio_back.backend.repository;

import com.borasio_back.backend.model.entity.FormularioContato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormularioContatoRepository extends JpaRepository<FormularioContato, Integer> {
}
