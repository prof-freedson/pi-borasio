package com.borasio_back.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usuarios", schema = "carona")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String senha;

    @Column(nullable = false, length = 20)
    private String tipo; // "passageiro" ou "motorista"

    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;

    // ----------------------------------------
    // Normaliza o tipo e define dataCadastro
    // ----------------------------------------
    @PrePersist
    public void prePersist() {
        if (this.tipo != null) {
            this.tipo = this.tipo.toLowerCase();
            if (!this.tipo.equals("passageiro") && !this.tipo.equals("motorista")) {
                throw new IllegalArgumentException("Tipo de usuário inválido: " + tipo);
            }
        }
        if (this.dataCadastro == null) {
            this.dataCadastro = LocalDateTime.now();
        }
    }

    @PreUpdate
    public void preUpdate() {
        if (this.tipo != null) {
            this.tipo = this.tipo.toLowerCase();
            if (!this.tipo.equals("passageiro") && !this.tipo.equals("motorista")) {
                throw new IllegalArgumentException("Tipo de usuário inválido: " + tipo);
            }
        }
    }

    // ----------------------------------------
    // UserDetails implementation
    // ----------------------------------------
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + tipo.toUpperCase()));
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
