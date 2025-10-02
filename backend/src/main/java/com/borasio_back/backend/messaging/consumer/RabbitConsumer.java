package com.borasio_back.backend.messaging.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitConsumer {

	// -----------------------------
	// Usuário
	// -----------------------------
	@RabbitListener(queues = "${rabbitmq.queue.user}")
	public void handleUserCreation(String message) {
		System.out.println("Criando usuário: " + message);
		// lógica de criação de usuário
	}

	// -----------------------------
	// Corrida
	// -----------------------------
	@RabbitListener(queues = "${rabbitmq.queue.ride.request}")
	public void handleRideRequest(String message) {
		System.out.println("Solicitação de corrida: " + message);
		// lógica de solicitação de corrida
	}

	@RabbitListener(queues = "${rabbitmq.queue.ride.complete}")
	public void handleRideComplete(String message) {
		System.out.println("Corrida finalizada: " + message);
		// lógica de finalização
	}

	// -----------------------------
	// Pagamento
	// -----------------------------
	@RabbitListener(queues = "${rabbitmq.queue.payment.confirm}")
	public void handlePaymentConfirm(String message) {
		System.out.println("Pagamento confirmado: " + message);
		// lógica de confirmação de pagamento
	}

	@RabbitListener(queues = "${rabbitmq.queue.payment.reject}")
	public void handlePaymentReject(String message) {
		System.out.println("Pagamento recusado: " + message);
		// lógica de recusa de pagamento
	}

	// -----------------------------
	// Chat
	// -----------------------------
	@RabbitListener(queues = "${rabbitmq.queue.chat}")
	public void handleChatMessage(String message) {
		System.out.println("Mensagem de chat: " + message);
		// lógica de chat
	}
}
