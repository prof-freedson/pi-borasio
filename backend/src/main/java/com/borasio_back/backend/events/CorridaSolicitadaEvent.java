package com.borasio_back.backend.events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CorridaSolicitadaEvent {
    private Long idCorrida;
    private Long idPassageiro;
    private String origem;
    private String destino;
}
