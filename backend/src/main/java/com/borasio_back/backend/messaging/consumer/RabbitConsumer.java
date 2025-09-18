package com.borasio_back.backend.messaging.consumer;

@Component
@RequiredArgsConstructor
public class RabbitConsumer {

    @RabbitListener(queues = RabbitConfig.USER_QUEUE)
    public void handleUserCreation(String message) {
        System.out.println("Criando usuário: " + message);
        // lógica de criação de usuário
    }

    @RabbitListener(queues = RabbitConfig.RIDE_REQUEST_QUEUE)
    public void handleRideRequest(String message) {
        System.out.println("Solicitação de corrida: " + message);
        // lógica de solicitação de corrida
    }

    @RabbitListener(queues = RabbitConfig.RIDE_COMPLETE_QUEUE)
    public void handleRideComplete(String message) {
        System.out.println("Corrida finalizada: " + message);
        // lógica de finalização
    }

    @RabbitListener(queues = RabbitConfig.PAYMENT_CONFIRM_QUEUE)
    public void handlePaymentConfirm(String message) {
        System.out.println("Pagamento confirmado: " + message);
        // lógica de confirmação de pagamento
    }

    @RabbitListener(queues = RabbitConfig.PAYMENT_REJECT_QUEUE)
    public void handlePaymentReject(String message) {
        System.out.println("Pagamento recusado: " + message);
        // lógica de recusa de pagamento
    }

    @RabbitListener(queues = RabbitConfig.CHAT_QUEUE)
    public void handleChatMessage(String message) {
        System.out.println("Mensagem de chat: " + message);
        // lógica de chat
    }
}

