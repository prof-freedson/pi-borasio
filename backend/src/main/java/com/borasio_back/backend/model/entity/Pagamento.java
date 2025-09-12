package com.borasio_back.backend.model.entity;

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
    private String metodoPagamento;

    @Column(length = 20)
    private String status; 
    // valores: "pendente", "aprovado", "recusado"
}
