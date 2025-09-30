package com.borasio_back.backend.service;

import com.borasio_back.backend.dto.PasswordRecoveryRequestDTO;
import com.borasio_back.backend.model.entity.PasswordRecoveryToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class PasswordRecoveryService {
	@Autowired
	private JavaMailSender mailSender;
	// Simulação de armazenamento de tokens (substitua por repository real)
	private final Map<String, PasswordRecoveryToken> tokenStore = new HashMap<>();

	public String createRecoveryToken(String email) {
		String token = UUID.randomUUID().toString();
		PasswordRecoveryToken recoveryToken = new PasswordRecoveryToken(token, email, LocalDateTime.now().plusHours(1));
		tokenStore.put(token, recoveryToken);
		return token;
	}

	public boolean sendRecoveryEmail(String email, String token) {
		try {
			String subject = "Recuperação de Senha";
			String recoveryLink = "https://seusite.com/resetar-senha?token=" + token;
			String text = "Para redefinir sua senha, clique no link: " + recoveryLink;
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(email);
			message.setSubject(subject);
			message.setText(text);
			mailSender.send(message);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
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
