package com.borasio_back.backend.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

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

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, Jackson2JsonMessageConverter messageConverter) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter);
        return template;
    }

    @Bean
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(exchangeName);
    }

    @Bean
    public Queue userQueue() { return new Queue(userQueueName, true); }

    @Bean
    public Queue rideRequestQueue() { return new Queue(rideRequestQueueName, true); }

    @Bean
    public Queue rideCompleteQueue() { return new Queue(rideCompleteQueueName, true); }

    @Bean
    public Queue paymentConfirmQueue() { return new Queue(paymentConfirmQueueName, true); }

    @Bean
    public Queue paymentRejectQueue() { return new Queue(paymentRejectQueueName, true); }

    @Bean
    public Queue chatQueue() { return new Queue(chatQueueName, true); }

    @Bean
    public Binding bindingUser(Queue userQueue, TopicExchange exchange) {
        return BindingBuilder.bind(userQueue).to(exchange).with(userQueueName);
    }

    @Bean
    public Binding bindingRideRequest(Queue rideRequestQueue, TopicExchange exchange) {
        return BindingBuilder.bind(rideRequestQueue).to(exchange).with(rideRequestQueueName);
    }

    @Bean
    public Binding bindingRideComplete(Queue rideCompleteQueue, TopicExchange exchange) {
        return BindingBuilder.bind(rideCompleteQueue).to(exchange).with(rideCompleteQueueName);
    }

    @Bean
    public Binding bindingPaymentConfirm(Queue paymentConfirmQueue, TopicExchange exchange) {
        return BindingBuilder.bind(paymentConfirmQueue).to(exchange).with(paymentConfirmQueueName);
    }

    @Bean
    public Binding bindingPaymentReject(Queue paymentRejectQueue, TopicExchange exchange) {
        return BindingBuilder.bind(paymentRejectQueue).to(exchange).with(paymentRejectQueueName);
    }

    @Bean
    public Binding bindingChat(Queue chatQueue, TopicExchange exchange) {
        return BindingBuilder.bind(chatQueue).to(exchange).with(chatQueueName);
    }
}
