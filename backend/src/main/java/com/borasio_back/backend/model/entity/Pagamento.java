package com.borasio_back.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pagamentos", schema = "carona")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "corrida_id", nullable = false)
    private Corrida corrida;

    @Column(name = "valor_pago", precision = 10, scale = 2)
    private BigDecimal valorPago;

    @Column(name = "data_pagamento")
    private LocalDateTime dataPagamento;

    @Column(name = "metodo_pagamento", length = 50)
    @Convert(converter = MetodoPagamentoConverter.class)
    private MetodoPagamento metodoPagamento;

    @Column(nullable = false, length = 50)
    @Convert(converter = StatusPagamentoConverter.class)
    private StatusPagamento status;

    // =====================================
    // ENUM DE STATUS
    // =====================================
    public enum StatusPagamento {
        PENDENTE,
        APROVADO,
        RECUSADO,
        REEMBOLSADO;

        @JsonCreator
        public static StatusPagamento fromString(String value) {
            if (value == null) return null;
            return StatusPagamento.valueOf(value.toUpperCase());
        }

        @JsonValue
        @Override
        public String toString() {
            return name();
        }
    }

    // =====================================
    // ENUM DE MÉTODO DE PAGAMENTO
    // =====================================
    public enum MetodoPagamento {
        PIX,
        BOLETO_BANCARIO,
        CARTAO_CREDITO_DEBITO;

        @JsonCreator
        public static MetodoPagamento fromString(String value) {
            if (value == null) return null;
            return MetodoPagamento.valueOf(value.toUpperCase().replace(" ", "_"));
        }

        @JsonValue
        @Override
        public String toString() {
            switch (this) {
                case BOLETO_BANCARIO:
                    return "Boleto bancário";
                case CARTAO_CREDITO_DEBITO:
                    return "Cartão de crédito/débito";
                default:
                    return name();
            }
        }
    }

    // =====================================
    // CONVERTERS JPA <-> ENUM
    // =====================================
    @Converter(autoApply = true)
    public static class StatusPagamentoConverter implements AttributeConverter<StatusPagamento, String> {

        @Override
        public String convertToDatabaseColumn(StatusPagamento status) {
            if (status == null) return null;
            return status.name();
        }

        @Override
        public StatusPagamento convertToEntityAttribute(String dbData) {
            if (dbData == null) return null;
            return StatusPagamento.fromString(dbData);
        }
    }

    @Converter(autoApply = true)
    public static class MetodoPagamentoConverter implements AttributeConverter<MetodoPagamento, String> {

        @Override
        public String convertToDatabaseColumn(MetodoPagamento metodo) {
            if (metodo == null) return null;
            return metodo.name();
        }

        @Override
        public MetodoPagamento convertToEntityAttribute(String dbData) {
            if (dbData == null) return null;
            return MetodoPagamento.fromString(dbData);
        }
    }
}
