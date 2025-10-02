package com.borasio_back.backend.service;

import com.borasio_back.backend.dto.PagamentoDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PagamentoPublisher {
	private final RabbitTemplate rabbitTemplate;

	@Value("${rabbitmq.exchange}")
	private String exchangeName;

	@Value("${rabbitmq.queue.payment.confirm}")
	private String paymentConfirmQueueName;

	@Value("${rabbitmq.queue.payment.reject}")
	private String paymentRejectQueueName;

	public PagamentoPublisher(RabbitTemplate rabbitTemplate) {
		this.rabbitTemplate = rabbitTemplate;
	}

	public void publicarConfirmacao(PagamentoDTO dto) {
		rabbitTemplate.convertAndSend(exchangeName, paymentConfirmQueueName, dto);
	}

	public void publicarRecusa(PagamentoDTO dto) {
		rabbitTemplate.convertAndSend(exchangeName, paymentRejectQueueName, dto);
	}
}
