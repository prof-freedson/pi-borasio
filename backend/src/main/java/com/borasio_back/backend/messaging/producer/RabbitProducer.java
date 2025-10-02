package com.borasio_back.backend.messaging.producer;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RabbitProducer {
    private final AmqpTemplate amqpTemplate;

    @Value("${rabbitmq.exchange}")
    private String exchangeName;

    @Value("${rabbitmq.queue.user}")
    private String userQueueName;

    @Value("${rabbitmq.queue.ride.request}")
    private String rideRequestQueueName;

    @Value("${rabbitmq.queue.ride.complete}")
    private String rideCompleteQueueName;

    @Value("${rabbitmq.queue.payment.confirm}")
    private String paymentConfirmQueueName;

    @Value("${rabbitmq.queue.payment.reject}")
    private String paymentRejectQueueName;

    @Value("${rabbitmq.queue.chat}")
    private String chatQueueName;

    public RabbitProducer(AmqpTemplate amqpTemplate) {
        this.amqpTemplate = amqpTemplate;
    }

    // -----------------------------
    // Usuário
    // -----------------------------
    public void enviarUsuarioCriado(String message) {
        amqpTemplate.convertAndSend(exchangeName, userQueueName, message);
    }

    // -----------------------------
    // Corrida
    // -----------------------------
    public void enviarCorridaSolicitada(String message) {
        amqpTemplate.convertAndSend(exchangeName, rideRequestQueueName, message);
    }

    public void enviarCorridaFinalizada(String message) {
        amqpTemplate.convertAndSend(exchangeName, rideCompleteQueueName, message);
    }

    // -----------------------------
    // Pagamento
    // -----------------------------
    public void enviarPagamentoAprovado(String message) {
        amqpTemplate.convertAndSend(exchangeName, paymentConfirmQueueName, message);
    }

    public void enviarPagamentoRejeitado(String message) {
        amqpTemplate.convertAndSend(exchangeName, paymentRejectQueueName, message);
    }

    // -----------------------------
    // Chat
    // -----------------------------
    public void enviarMensagemChat(String message) {
        amqpTemplate.convertAndSend(exchangeName, chatQueueName, message);
    }
}
