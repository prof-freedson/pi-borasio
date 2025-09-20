package com.borasio_back.backend.messaging.consumer;

import com.borasio_back.backend.config.RabbitMQConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RabbitConsumer {

    // -----------------------------
    // Usuário
    // -----------------------------
    @RabbitListener(queues = RabbitMQConfig.USER_QUEUE)
    public void handleUserCreation(String message) {
        System.out.println("Criando usuário: " + message);
        // lógica de criação de usuário
    }

    // -----------------------------
    // Corrida
    // -----------------------------
    @RabbitListener(queues = RabbitMQConfig.RIDE_REQUEST_QUEUE)
    public void handleRideRequest(String message) {
        System.out.println("Solicitação de corrida: " + message);
        // lógica de solicitação de corrida
    }

    @RabbitListener(queues = RabbitMQConfig.RIDE_COMPLETE_QUEUE)
    public void handleRideComplete(String message) {
        System.out.println("Corrida finalizada: " + message);
        // lógica de finalização
    }

    // -----------------------------
    // Pagamento
    // -----------------------------
    @RabbitListener(queues = RabbitMQConfig.PAYMENT_CONFIRM_QUEUE)
    public void handlePaymentConfirm(String message) {
        System.out.println("Pagamento confirmado: " + message);
        // lógica de confirmação de pagamento
    }

    @RabbitListener(queues = RabbitMQConfig.PAYMENT_REJECT_QUEUE)
    public void handlePaymentReject(String message) {
        System.out.println("Pagamento recusado: " + message);
        // lógica de recusa de pagamento
    }

    // -----------------------------
    // Chat
    // -----------------------------
    @RabbitListener(queues = RabbitMQConfig.CHAT_QUEUE)
    public void handleChatMessage(String message) {
        System.out.println("Mensagem de chat: " + message);
        // lógica de chat
    }
}
