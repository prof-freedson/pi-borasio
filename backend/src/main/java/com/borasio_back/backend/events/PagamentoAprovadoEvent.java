package com.borasio_back.backend.events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PagamentoAprovadoEvent {
    private Long idPagamento;
    private Long idUsuario;
    private Double valor;
}

