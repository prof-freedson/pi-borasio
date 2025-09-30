package com.borasio_back.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "usuarios", schema = "carona")
public class Usuario implements UserDetails {

    // ==============================
    // ENUM INTERNO
    // ==============================
    public enum TipoUsuario {
        MOTORISTA,
        PASSAGEIRO,
        ADMIN;

        // Aceita maiúsculas e minúsculas no JSON de entrada
        @JsonCreator
        public static TipoUsuario fromString(String value) {
            if (value == null) return null;
            return TipoUsuario.valueOf(value.toUpperCase());
        }

        // Sempre retorna minúsculo no JSON de saída
        @JsonValue
        @Override
        public String toString() {
            return name().toLowerCase();
        }
    }

    // ==============================
    // CONVERTER INTERNO (JPA ↔ DB)
    // ==============================
    @Converter(autoApply = true)
    public static class TipoUsuarioConverter implements AttributeConverter<TipoUsuario, String> {

        @Override
        public String convertToDatabaseColumn(TipoUsuario tipo) {
            if (tipo == null) return null;
            return tipo.toString(); // salva como minúsculo no banco
        }

        @Override
        public TipoUsuario convertToEntityAttribute(String dbData) {
            if (dbData == null) return null;
            return TipoUsuario.fromString(dbData); // aceita maiúsculas/minúsculas
        }
    }

    // ==============================
    // CAMPOS
    // ==============================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String senha;

    @Convert(converter = TipoUsuarioConverter.class)
    @Column(nullable = false, columnDefinition = "carona.tipo_usuario")
    private TipoUsuario tipo;

    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;

    @PrePersist
    public void prePersist() {
        if (this.dataCadastro == null) {
            this.dataCadastro = LocalDateTime.now();
        }
    }

    // ==============================
    // UserDetails IMPLEMENTATION
    // ==============================
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + tipo.name()));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}
