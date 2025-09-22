package com.borasio_back.backend.dto;

import com.borasio_back.backend.enums.StatusPagamento;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PagamentoDTO {
    private Long id;
    private Long corridaId;
    private BigDecimal valorPago;
    private LocalDateTime dataPagamento;
    private String metodoPagamento;
    private StatusPagamento status;
}