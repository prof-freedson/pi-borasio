package com.borasio_back.backend.repository;

import com.borasio_back.backend.model.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
}
