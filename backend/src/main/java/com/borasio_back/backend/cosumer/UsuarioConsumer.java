package com.borasio_back.backend.cosumer;

import com.borasio_back.backend.config.RabbitMQConfig;
import com.borasio_back.backend.dto.UsuarioDTO;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class UsuarioConsumer {

    @RabbitListener(queues = RabbitMQConfig.FILA_USUARIO)
    public void receberUsuario(UsuarioDTO usuario) {
        System.out.println("Usuário recebido: " + usuario.getNome());
        // Aqui você pode salvar no banco, enviar email, etc.
    }
}
