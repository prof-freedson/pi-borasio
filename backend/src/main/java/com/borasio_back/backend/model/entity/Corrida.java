package com.borasio_back.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "corridas", schema = "carona")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Corrida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "passageiro_id", nullable = false)
    private Passageiro passageiro;

    @ManyToOne
    @JoinColumn(name = "motorista_id", nullable = false)
    private Motorista motorista;

    @Column(nullable = false, length = 255)
    private String origem;

    @Column(nullable = false, length = 255)
    private String destino;

    @Column(name = "data_corrida")
    private LocalDateTime dataCorrida;

    @Column(nullable = false, length = 20)
    @Convert(converter = StatusCorridaConverter.class)
    private StatusCorrida status;

    @Column(precision = 10, scale = 2)
    private BigDecimal valor;

    // =====================================
    // ENUM DE STATUS
    // =====================================
    public enum StatusCorrida {
        PENDENTE,
        EM_ANDAMENTO,
        FINALIZADA,
        CANCELADA,
        ACEITA;

        @JsonCreator
        public static StatusCorrida fromString(String value) {
            if (value == null) return null;
            return StatusCorrida.valueOf(value.toUpperCase());
        }

        @JsonValue
        @Override
        public String toString() {
            return name();
        }
    }

    // =====================================
    // CONVERTER JPA <-> ENUM
    // =====================================
    @Converter(autoApply = true)
    public static class StatusCorridaConverter implements AttributeConverter<StatusCorrida, String> {

        @Override
        public String convertToDatabaseColumn(StatusCorrida status) {
            if (status == null) return null;
            return status.name();
        }

        @Override
        public StatusCorrida convertToEntityAttribute(String dbData) {
            if (dbData == null) return null;
            return StatusCorrida.fromString(dbData);
        }
    }
}
