package com.borasio_back.backend.service;

import com.borasio_back.backend.dto.CorridaDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RidePublisher {
	private final RabbitTemplate rabbitTemplate;

	@Value("${rabbitmq.exchange}")
	private String exchangeName;

	@Value("${rabbitmq.queue.ride.request}")
	private String rideRequestQueueName;

	@Value("${rabbitmq.queue.ride.complete}")
	private String rideCompleteQueueName;

	public RidePublisher(RabbitTemplate rabbitTemplate) {
		this.rabbitTemplate = rabbitTemplate;
	}

	public void solicitarCorrida(CorridaDTO corrida) {
		rabbitTemplate.convertAndSend(exchangeName, rideRequestQueueName, corrida);
		System.out.println("Corrida solicitada: " + corrida.getId());
	}

	public void finalizarCorrida(CorridaDTO corrida) {
		rabbitTemplate.convertAndSend(exchangeName, rideCompleteQueueName, corrida);
		System.out.println("Corrida finalizada: " + corrida.getId());
	}
}
