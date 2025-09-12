package com.borasio_back.backend.service;

import com.borasio_back.backend.dto.PasswordRecoveryRequestDTO;
import com.borasio_back.backend.model.entity.PasswordRecoveryToken;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class PasswordRecoveryService {
	// Simulação de armazenamento de tokens (substitua por repository real)
	private final Map<String, PasswordRecoveryToken> tokenStore = new HashMap<>();

	public String createRecoveryToken(String email) {
		String token = UUID.randomUUID().toString();
		PasswordRecoveryToken recoveryToken = new PasswordRecoveryToken(token, email, LocalDateTime.now().plusHours(1));
		tokenStore.put(token, recoveryToken);
		// Aqui você enviaria o e-mail com o token
		return token;
	}

	public boolean validateToken(String token) {
		PasswordRecoveryToken recoveryToken = tokenStore.get(token);
		return recoveryToken != null && recoveryToken.getExpiryDate().isAfter(LocalDateTime.now());
	}

	public boolean resetPassword(String token, String newPassword) {
		if (!validateToken(token)) return false;
		// Aqui você buscaria o usuário pelo e-mail e atualizaria a senha
		// Exemplo: usuarioRepository.updatePassword(recoveryToken.getEmail(), newPassword);
		tokenStore.remove(token);
		return true;
	}
}
