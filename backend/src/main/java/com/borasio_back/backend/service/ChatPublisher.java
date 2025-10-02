package com.borasio_back.backend.service;

import com.borasio_back.backend.dto.ChatDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ChatPublisher {
    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange}")
    private String exchangeName;

    @Value("${rabbitmq.queue.chat}")
    private String chatQueueName;

    public ChatPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publicarMensagem(ChatDTO dto) {
        rabbitTemplate.convertAndSend(exchangeName, chatQueueName, dto);
    }
}
