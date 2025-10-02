package com.borasio_back.backend.messaging.consumer;

import com.borasio_back.backend.events.*;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class EventConsumer {

	@RabbitListener(queues = "${rabbitmq.queue.user}")
	public void onUsuarioCriado(UsuarioCriadoEvent event) {
		System.out.println("Usuário criado: " + event.getNome());
	}

	@RabbitListener(queues = "${rabbitmq.queue.payment.confirm}")
	public void onPagamentoAprovado(PagamentoAprovadoEvent event) {
		System.out.println("Pagamento aprovado: " + event.getIdPagamento());
	}

	@RabbitListener(queues = "${rabbitmq.queue.payment.reject}")
	public void onPagamentoRejeitado(PagamentoRejeitadoEvent event) {
		System.out.println("Pagamento rejeitado: " + event.getMotivo());
	}

	@RabbitListener(queues = "${rabbitmq.queue.chat}")
	public void onChatMensagem(ChatMensagemEvent event) {
		System.out.println("Chat de " + event.getIdRemetente() + " para " + event.getIdDestinatario() + ": " + event.getMensagem());
	}

	@RabbitListener(queues = "${rabbitmq.queue.ride.request}")
	public void onCorridaSolicitada(CorridaSolicitadaEvent event) {
		System.out.println("Corrida solicitada: " + event.getIdCorrida());
	}

	@RabbitListener(queues = "${rabbitmq.queue.ride.complete}")
	public void onCorridaFinalizada(CorridaFinalizadaEvent event) {
		System.out.println("Corrida finalizada: " + event.getIdCorrida());
	}
}
