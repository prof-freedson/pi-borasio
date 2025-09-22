package com.borasio_back.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AvaliacaoDTO {
    private Long id;
    private Long corridaId;
    private Long usuarioId;
    private Integer nota;
    private String comentario;
    private LocalDateTime dataAvaliacao;
    private String nomeAvaliador;
}