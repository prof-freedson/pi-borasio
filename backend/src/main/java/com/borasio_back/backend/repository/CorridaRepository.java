package com.borasio_back.backend.repository;

import com.borasio_back.backend.model.entity.Corrida;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CorridaRepository extends JpaRepository<Corrida, Integer> {
}
