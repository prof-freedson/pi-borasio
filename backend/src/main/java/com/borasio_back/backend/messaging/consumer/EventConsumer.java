package com.borasio_back.backend.messaging.consumer;

import com.borasio_back.backend.config.RabbitMQConfig;
import com.borasio_back.backend.events.*;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class EventConsumer {

    @RabbitListener(queues = RabbitMQConfig.USER_QUEUE)
    public void onUsuarioCriado(UsuarioCriadoEvent event) {
        System.out.println("Usuário criado: " + event.getNome());
    }

    @RabbitListener(queues = RabbitMQConfig.PAYMENT_CONFIRM_QUEUE)
    public void onPagamentoAprovado(PagamentoAprovadoEvent event) {
        System.out.println("Pagamento aprovado: " + event.getIdPagamento());
    }

    @RabbitListener(queues = RabbitMQConfig.PAYMENT_REJECT_QUEUE)
    public void onPagamentoRejeitado(PagamentoRejeitadoEvent event) {
        System.out.println("Pagamento rejeitado: " + event.getMotivo());
    }

    @RabbitListener(queues = RabbitMQConfig.CHAT_QUEUE)
    public void onChatMensagem(ChatMensagemEvent event) {
        System.out.println("Chat de " + event.getIdRemetente() + " para " + event.getIdDestinatario() + ": " + event.getMensagem());
    }

    @RabbitListener(queues = RabbitMQConfig.RIDE_REQUEST_QUEUE)
    public void onCorridaSolicitada(CorridaSolicitadaEvent event) {
        System.out.println("Corrida solicitada: " + event.getIdCorrida());
    }

    @RabbitListener(queues = RabbitMQConfig.RIDE_COMPLETE_QUEUE)
    public void onCorridaFinalizada(CorridaFinalizadaEvent event) {
        System.out.println("Corrida finalizada: " + event.getIdCorrida());
    }
}
