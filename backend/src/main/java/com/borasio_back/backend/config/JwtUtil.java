package com.borasio_back.backend.config;

import com.borasio_back.backend.model.entity.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
	private final String jwtSecret = "segredoSuperSecreto"; // Troque para variável de ambiente em produção
	private final long jwtExpirationMs = 86400000; // 1 dia

	public String generateToken(Usuario usuario) {
		return Jwts.builder()
				.setSubject(usuario.getEmail())
				.claim("id", usuario.getId())
				.claim("role", usuario.getTipo())
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
				.signWith(SignatureAlgorithm.HS512, jwtSecret)
				.compact();
	}
}
