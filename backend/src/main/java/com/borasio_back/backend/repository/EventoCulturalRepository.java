package com.borasio_back.backend.repository;

import com.borasio_back.backend.model.entity.EventoCultural;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoCulturalRepository extends JpaRepository<EventoCultural, Integer> {
}
