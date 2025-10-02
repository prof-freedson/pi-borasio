package com.borasio_back.backend.messaging;

import com.borasio_back.backend.events.UsuarioCriadoEvent;
import com.borasio_back.backend.messaging.producer.EventProducer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.beans.factory.annotation.Value;

@SpringBootTest
@ActiveProfiles("test")
public class RabbitMQIntegrationTest {

    @Autowired
    private EventProducer eventProducer;

    @Value("${rabbitmq.queue.user}")
    private String userQueueName;

    @Test
    public void testSendAndReceiveUsuarioCriadoEvent() throws InterruptedException {
        // Cria evento
        UsuarioCriadoEvent event = new UsuarioCriadoEvent(1L, "Teste", "teste@email.com");
        // Envia evento
        eventProducer.send(userQueueName, event);
        // Aguarda processamento
        Thread.sleep(2000);
        // Verifique o console para saída do consumidor
    }
}
