package com.borasio_back.backend.controller;

import com.borasio_back.backend.dto.AuthRequest;
import com.borasio_back.backend.dto.AuthResponse;
import com.borasio_back.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
		AuthResponse response = authService.authenticate(request);
		return ResponseEntity.ok(response);
	}
}
