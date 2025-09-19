package com.borasio_back.backend.repository;

import com.borasio_back.backend.model.entity.Passageiro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassageiroRepository extends JpaRepository<Passageiro, Integer> {
}
