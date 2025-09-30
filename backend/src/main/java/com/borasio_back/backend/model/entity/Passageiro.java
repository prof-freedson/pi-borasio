package com.borasio_back.backend.model.entity; 
import jakarta.persistence.*; import lombok.*;

@Entity
@Table(name = "passageiros", schema = "carona")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Passageiro {

    @Id
    private Long id; // vai ser o mesmo id do Usuario

    @OneToOne
    @MapsId
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(length = 255)
    private String preferencias;

    @Column(length = 14)
    private String cpf;

    @Column(length = 255)
    private String endereco;

    @Column(length = 20)
    private String telefone;

    // Auxiliares
    public String getNome() {
        return usuario != null ? usuario.getNome() : null;
    }

    public String getEmail() {
        return usuario != null ? usuario.getEmail() : null;
    }

    public String getSenha() {
        return usuario != null ? usuario.getSenha() : null;
    }
}
