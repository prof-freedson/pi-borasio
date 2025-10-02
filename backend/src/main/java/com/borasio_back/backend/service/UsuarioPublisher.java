package com.borasio_back.backend.service;

import com.borasio_back.backend.dto.UsuarioDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class UsuarioPublisher {
    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange}")
    private String exchangeName;

    @Value("${rabbitmq.queue.user}")
    private String userQueueName;

    public UsuarioPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publicarCriacaoUsuario(UsuarioDTO usuarioDTO) {
        rabbitTemplate.convertAndSend(exchangeName, userQueueName, usuarioDTO);
    }
}
