package com.borasio_back.backend.service;

import com.borasio_back.backend.config.RabbitMQConfig;
import com.borasio_back.backend.dto.UsuarioDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioPublisher {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void publicarCriacaoUsuario(UsuarioDTO usuarioDTO) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EXCHANGE_NAME,
            RabbitMQConfig.USER_QUEUE,
            usuarioDTO
        );
    }
}
