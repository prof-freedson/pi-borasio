package com.borasio_back.backend.dto;

import com.borasio_back.backend.enums.StatusCorrida;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CorridaDTO {
    private Long id;
    private Long passageiroId;
    private Long motoristaId;
    private String origem;
    private String destino;
    private LocalDateTime dataCorrida;
    private StatusCorrida status;
    private BigDecimal valor;
    private String nomePassageiro;
    private String nomeMotorista;
}