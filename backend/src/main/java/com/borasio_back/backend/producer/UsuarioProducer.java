package com.borasio_back.backend.producer;

import com.borasio_back.backend.dto.UsuarioDTO;
import com.borasio_back.backend.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class UsuarioProducer {

    private final RabbitTemplate rabbitTemplate;

    public UsuarioProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void enviarCriacaoUsuario(UsuarioDTO usuario) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.FILA_USUARIO, usuario);
        System.out.println("Mensagem enviada para criação de usuário: " + usuario.getNome());
    }
}
