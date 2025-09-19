package com.borasio_back.backend.messaging.producer;

import com.borasio_back.backend.config.RabbitMQConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RabbitProducer {

    private final AmqpTemplate amqpTemplate;

    // -----------------------------
    // Usuário
    // -----------------------------
    public void enviarUsuarioCriado(String message) {
        amqpTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.USER_QUEUE, message);
    }

    // -----------------------------
    // Corrida
    // -----------------------------
    public void enviarCorridaSolicitada(String message) {
        amqpTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.RIDE_REQUEST_QUEUE, message);
    }

    public void enviarCorridaFinalizada(String message) {
        amqpTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.RIDE_COMPLETE_QUEUE, message);
    }

    // -----------------------------
    // Pagamento
    // -----------------------------
    public void enviarPagamentoAprovado(String message) {
        amqpTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.PAYMENT_CONFIRM_QUEUE, message);
    }

    public void enviarPagamentoRejeitado(String message) {
        amqpTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.PAYMENT_REJECT_QUEUE, message);
    }

    // -----------------------------
    // Chat
    // -----------------------------
    public void enviarMensagemChat(String message) {
        amqpTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.CHAT_QUEUE, message);
    }
}
