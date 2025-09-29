package com.borasio_back.backend.dto;

import com.borasio_back.backend.model.entity.Pagamento;
import com.borasio_back.backend.model.entity.Pagamento.MetodoPagamento;
import com.borasio_back.backend.model.entity.Pagamento.StatusPagamento;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PagamentoDTO {

    private Long id;
    private Long corridaId;
    private BigDecimal valorPago;
    private LocalDateTime dataPagamento;
    private MetodoPagamento metodoPagamento;
    private StatusPagamento status;

    public PagamentoDTO() {}

    public PagamentoDTO(Pagamento pagamento) {
        if (pagamento != null) {
            this.id = pagamento.getId();
            if (pagamento.getCorrida() != null) {
                this.corridaId = pagamento.getCorrida().getId();
            }
            this.valorPago = pagamento.getValorPago();
            this.dataPagamento = pagamento.getDataPagamento();
            this.metodoPagamento = pagamento.getMetodoPagamento();
            this.status = pagamento.getStatus();
        }
    }
}
