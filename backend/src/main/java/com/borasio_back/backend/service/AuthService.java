package com.borasio_back.backend.service;

import com.borasio_back.backend.dto.AuthRequest;
import com.borasio_back.backend.dto.AuthResponse;
import com.borasio_back.backend.model.entity.Usuario;
import com.borasio_back.backend.repository.UsuarioRepository;
import com.borasio_back.backend.config.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
	private final AuthenticationManager authenticationManager;
	private final UsuarioRepository usuarioRepository;
	private final JwtUtil jwtUtil;

	public AuthService(AuthenticationManager authenticationManager, UsuarioRepository usuarioRepository, JwtUtil jwtUtil) {
		this.authenticationManager = authenticationManager;
		this.usuarioRepository = usuarioRepository;
		this.jwtUtil = jwtUtil;
	}

	public AuthResponse authenticate(AuthRequest request) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getEmail(), request.getSenha())
		);

		Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

		String token = jwtUtil.generateToken(usuario);
		return new AuthResponse(
			token,
			usuario.getId(),
			usuario.getEmail(),
			usuario.getTipo()
		);
	}
}
