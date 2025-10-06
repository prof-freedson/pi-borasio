package com.borasio_back.backend.repository;

import com.borasio_back.backend.model.entity.Corrida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CorridaRepository extends JpaRepository<Corrida, Long> {

    @Query("SELECT c FROM Corrida c LEFT JOIN FETCH c.passageiro LEFT JOIN FETCH c.motorista")
    List<Corrida> findAllWithRelations();
}