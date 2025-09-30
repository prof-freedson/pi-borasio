package com.borasio_back.backend.service;

import com.borasio_back.backend.config.RabbitMQConfig;
import com.borasio_back.backend.dto.CorridaDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CorridaPublisher {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    /**
     * Publica uma corrida solicitada na fila "corrida.request"
     */
    public void publicarSolicitacao(CorridaDTO corridaDTO) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_NAME,
                "corrida.request", // routing key
                corridaDTO
        );
    }

    /**
     * Publica uma corrida finalizada na fila "corrida.complete"
     */
    public void publicarFinalizacao(CorridaDTO corridaDTO) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_NAME,
                "corrida.complete", // routing key
                corridaDTO
        );
    }
}
