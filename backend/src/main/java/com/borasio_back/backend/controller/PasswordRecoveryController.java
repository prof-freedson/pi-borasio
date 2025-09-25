package com.borasio_back.backend.controller;

import com.borasio_back.backend.dto.PasswordRecoveryRequestDTO;
import com.borasio_back.backend.service.PasswordRecoveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/password-recovery")
public class PasswordRecoveryController {

	@Autowired
	private PasswordRecoveryService passwordRecoveryService;

	@PostMapping("/request")
	public ResponseEntity<String> requestRecovery(@RequestBody PasswordRecoveryRequestDTO request) {
		String token = passwordRecoveryService.createRecoveryToken(request.getEmail());
		// Aqui você enviaria o e-mail com o token
		// Exemplo: emailService.sendRecoveryEmail(request.getEmail(), token);
		return ResponseEntity.ok("Token de recuperação enviado para o e-mail. Token: " + token);
	}

	@PostMapping("/reset")
	public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
		boolean success = passwordRecoveryService.resetPassword(token, newPassword);
		if (success) {
			return ResponseEntity.ok("Senha redefinida com sucesso.");
		} else {
			return ResponseEntity.badRequest().body("Token inválido ou expirado.");
		}
	}
}
