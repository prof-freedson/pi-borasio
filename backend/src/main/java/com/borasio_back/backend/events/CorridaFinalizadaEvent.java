package com.borasio_back.backend.events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CorridaFinalizadaEvent {
    private Long idCorrida;
    private Long idMotorista;
    private Long idPassageiro;
    private Double valor;
}

