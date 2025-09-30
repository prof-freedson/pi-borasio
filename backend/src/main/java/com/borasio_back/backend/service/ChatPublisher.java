package com.borasio_back.backend.service;

import com.borasio_back.backend.config.RabbitMQConfig;
import com.borasio_back.backend.dto.ChatDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatPublisher {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void publicarMensagem(ChatDTO dto) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EXCHANGE_NAME,
            RabbitMQConfig.CHAT_QUEUE,
            dto
        );
    }
}
