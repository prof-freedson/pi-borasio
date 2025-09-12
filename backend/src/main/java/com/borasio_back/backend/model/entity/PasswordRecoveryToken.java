package com.borasio_back.backend.model.entity;

import java.time.LocalDateTime;

public class PasswordRecoveryToken {
	private String token;
	private String email;
	private LocalDateTime expiryDate;

	public PasswordRecoveryToken() {}

	public PasswordRecoveryToken(String token, String email, LocalDateTime expiryDate) {
		this.token = token;
		this.email = email;
		this.expiryDate = expiryDate;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDateTime getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(LocalDateTime expiryDate) {
		this.expiryDate = expiryDate;
	}
}
