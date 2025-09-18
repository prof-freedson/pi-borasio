package com.borasio_back.backend.messaging.producer;

@Service
@RequiredArgsConstructor
public class RabbitProducer {

    private final AmqpTemplate amqpTemplate;

    public void sendUserCreationMessage(String message) {
        amqpTemplate.convertAndSend(RabbitConfig.USER_QUEUE, message);
    }

    public void sendRideRequestMessage(String message) {
        amqpTemplate.convertAndSend(RabbitConfig.RIDE_REQUEST_QUEUE, message);
    }

    public void sendRideCompleteMessage(String message) {
        amqpTemplate.convertAndSend(RabbitConfig.RIDE_COMPLETE_QUEUE, message);
    }

    public void sendPaymentConfirmMessage(String message) {
        amqpTemplate.convertAndSend(RabbitConfig.PAYMENT_CONFIRM_QUEUE, message);
    }

    public void sendPaymentRejectMessage(String message) {
        amqpTemplate.convertAndSend(RabbitConfig.PAYMENT_REJECT_QUEUE, message);
    }

    public void sendChatMessage(String message) {
        amqpTemplate.convertAndSend(RabbitConfig.CHAT_QUEUE, message);
    }
}
