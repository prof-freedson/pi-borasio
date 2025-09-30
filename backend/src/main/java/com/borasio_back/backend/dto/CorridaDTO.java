package com.borasio_back.backend.dto;

import com.borasio_back.backend.model.entity.Corrida;
import com.borasio_back.backend.model.entity.Corrida.StatusCorrida;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CorridaDTO {
    private Long id;
    private Long passageiroId;
    private String nomePassageiro;
    private Long motoristaId;
    private String nomeMotorista;
    private String origem;
    private String destino;
    private LocalDateTime dataCorrida;
    private StatusCorrida status;
    private BigDecimal valor;

    public CorridaDTO() {}

    public CorridaDTO(Corrida corrida) {
        if (corrida != null) {
            this.id = corrida.getId();
            this.origem = corrida.getOrigem();
            this.destino = corrida.getDestino();
            this.dataCorrida = corrida.getDataCorrida();
            this.status = corrida.getStatus();
            this.valor = corrida.getValor();

            if (corrida.getPassageiro() != null) {
                this.passageiroId = corrida.getPassageiro().getId();
                this.nomePassageiro = corrida.getPassageiro().getNome();
            }

            if (corrida.getMotorista() != null) {
                this.motoristaId = corrida.getMotorista().getId();
                this.nomeMotorista = corrida.getMotorista().getNome();
            }
        }
    }
}
