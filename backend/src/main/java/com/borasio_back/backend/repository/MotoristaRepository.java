package com.borasio_back.backend.repository;

import com.borasio_back.backend.model.entity.Motorista;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MotoristaRepository extends JpaRepository<Motorista, Long> {
}
