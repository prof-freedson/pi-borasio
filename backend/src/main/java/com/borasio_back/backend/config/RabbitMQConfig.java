package com.borasio_back.backend.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    // Filas
    public static final String FILA_USUARIO = "fila.usuario";
    public static final String FILA_CORRIDA = "fila.corrida";
    public static final String FILA_PAGAMENTO = "fila.pagamento";
    public static final String FILA_CHAT = "fila.chat";

    @Bean
    public Queue filaUsuario() {
        return new Queue(FILA_USUARIO, true);
    }

    @Bean
    public Queue filaCorrida() {
        return new Queue(FILA_CORRIDA, true);
    }

    @Bean
    public Queue filaPagamento() {
        return new Queue(FILA_PAGAMENTO, true);
    }

    @Bean
    public Queue filaChat() {
        return new Queue(FILA_CHAT, true);
    }

    // Exchange direta (opcional, se quiser rotear mensagens)
    @Bean
    public DirectExchange directExchange() {
        return new DirectExchange("exchange.direct");
    }

    // Bindings
    @Bean
    public Binding bindingUsuario(Queue filaUsuario, DirectExchange exchange) {
        return BindingBuilder.bind(filaUsuario).to(exchange).with("usuario");
    }

    @Bean
    public Binding bindingCorrida(Queue filaCorrida, DirectExchange exchange) {
        return BindingBuilder.bind(filaCorrida).to(exchange).with("corrida");
    }

    @Bean
    public Binding bindingPagamento(Queue filaPagamento, DirectExchange exchange) {
        return BindingBuilder.bind(filaPagamento).to(exchange).with("pagamento");
    }

    @Bean
    public Binding bindingChat(Queue filaChat, DirectExchange exchange) {
        return BindingBuilder.bind(filaChat).to(exchange).with("chat");
    }
}
