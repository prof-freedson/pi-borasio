package com.borasio_back.backend.config;

@Configuration
public class RabbitConfig {

    public static final String USER_QUEUE = "user.create";
    public static final String RIDE_REQUEST_QUEUE = "ride.request";
    public static final String RIDE_COMPLETE_QUEUE = "ride.complete";
    public static final String PAYMENT_CONFIRM_QUEUE = "payment.confirm";
    public static final String PAYMENT_REJECT_QUEUE = "payment.reject";
    public static final String CHAT_QUEUE = "chat.message";

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
}
