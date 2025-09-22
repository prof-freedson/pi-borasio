package com.borasio_back.backend.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CorridaRequest {
    private Long passageiroId;
    private String origem;
    private String destino;
    private BigDecimal valorEstimado;
}