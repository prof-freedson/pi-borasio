package com.borasio_back.backend.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    // Exchange
    public static final String EXCHANGE_NAME = "borasio_exchange";

    // Queues
    public static final String USER_QUEUE = "user.create";
    public static final String RIDE_REQUEST_QUEUE = "ride.request";
    public static final String RIDE_COMPLETE_QUEUE = "ride.complete";
    public static final String PAYMENT_CONFIRM_QUEUE = "payment.confirm";
    public static final String PAYMENT_REJECT_QUEUE = "payment.reject";
    public static final String CHAT_QUEUE = "chat.message";

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    // Queue Beans
    @Bean
    public Queue userQueue() { return new Queue(USER_QUEUE, true); }

    @Bean
    public Queue rideRequestQueue() { return new Queue(RIDE_REQUEST_QUEUE, true); }

    @Bean
    public Queue rideCompleteQueue() { return new Queue(RIDE_COMPLETE_QUEUE, true); }

    @Bean
    public Queue paymentConfirmQueue() { return new Queue(PAYMENT_CONFIRM_QUEUE, true); }

    @Bean
    public Queue paymentRejectQueue() { return new Queue(PAYMENT_REJECT_QUEUE, true); }

    @Bean
    public Queue chatQueue() { return new Queue(CHAT_QUEUE, true); }

    // Binding Beans
    @Bean
    public Binding bindingUser(Queue userQueue, TopicExchange exchange) {
        return BindingBuilder.bind(userQueue).to(exchange).with(USER_QUEUE);
    }

    @Bean
    public Binding bindingRideRequest(Queue rideRequestQueue, TopicExchange exchange) {
        return BindingBuilder.bind(rideRequestQueue).to(exchange).with(RIDE_REQUEST_QUEUE);
    }

    @Bean
    public Binding bindingRideComplete(Queue rideCompleteQueue, TopicExchange exchange) {
        return BindingBuilder.bind(rideCompleteQueue).to(exchange).with(RIDE_COMPLETE_QUEUE);
    }

    @Bean
    public Binding bindingPaymentConfirm(Queue paymentConfirmQueue, TopicExchange exchange) {
        return BindingBuilder.bind(paymentConfirmQueue).to(exchange).with(PAYMENT_CONFIRM_QUEUE);
    }

    @Bean
    public Binding bindingPaymentReject(Queue paymentRejectQueue, TopicExchange exchange) {
        return BindingBuilder.bind(paymentRejectQueue).to(exchange).with(PAYMENT_REJECT_QUEUE);
    }

    @Bean
    public Binding bindingChat(Queue chatQueue, TopicExchange exchange) {
        return BindingBuilder.bind(chatQueue).to(exchange).with(CHAT_QUEUE);
    }
}
