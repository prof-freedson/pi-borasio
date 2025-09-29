package com.borasio_back.backend.controller;

import com.borasio_back.backend.dto.PasswordRecoveryRequestDTO;
import com.borasio_back.backend.service.PasswordRecoveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/password-recovery")
@CrossOrigin(origins = "http://localhost:3000")
public class PasswordRecoveryController {

	@Autowired
	private PasswordRecoveryService passwordRecoveryService;

	@PostMapping("/request")
	public ResponseEntity<String> requestRecovery(@RequestBody PasswordRecoveryRequestDTO request) {
		String token = passwordRecoveryService.createRecoveryToken(request.getEmail());
		boolean emailSent = passwordRecoveryService.sendRecoveryEmail(request.getEmail(), token);
		if (emailSent) {
			return ResponseEntity.ok("Token de recuperação enviado para o e-mail.");
		} else {
			return ResponseEntity.status(500).body("Falha ao enviar e-mail de recuperação.");
		}
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
