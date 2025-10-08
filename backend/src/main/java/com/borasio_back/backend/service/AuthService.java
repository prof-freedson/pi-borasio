package com.borasio_back.backend.service;

import com.borasio_back.backend.dto.AuthRequest;
import com.borasio_back.backend.dto.AuthResponse;
import com.borasio_back.backend.model.entity.Usuario;
import com.borasio_back.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse authenticate(AuthRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(request.getSenha(), usuario.getSenha())) {
            throw new RuntimeException("Senha incorreta");
        }

        String token = jwtService.generateToken(usuario);

    return new AuthResponse(
        token,
        usuario.getId(),
        usuario.getNome(),
        usuario.getEmail(),
        usuario.getTipo() != null ? usuario.getTipo().name() : null
    );
    }

    public void register(com.borasio_back.backend.dto.RegisterRequest request) {
        // Verifica se já existe
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado");
        }

        Usuario novo = Usuario.builder()
                .nome(request.getNome())
                .email(request.getEmail())
                .senha(passwordEncoder.encode(request.getSenha()))
                .tipo(Usuario.TipoUsuario.PASSAGEIRO)
                .build();

        usuarioRepository.save(novo);
    }
}
