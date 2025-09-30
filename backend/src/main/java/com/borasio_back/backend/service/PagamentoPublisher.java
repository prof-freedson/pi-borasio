package com.borasio_back.backend.service;

import com.borasio_back.backend.config.RabbitMQConfig;
import com.borasio_back.backend.dto.PagamentoDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PagamentoPublisher {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void publicarConfirmacao(PagamentoDTO dto) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EXCHANGE_NAME,
            RabbitMQConfig.PAYMENT_CONFIRM_QUEUE,
            dto
        );
    }

    public void publicarRecusa(PagamentoDTO dto) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EXCHANGE_NAME,
            RabbitMQConfig.PAYMENT_REJECT_QUEUE,
            dto
        );
    }
}
