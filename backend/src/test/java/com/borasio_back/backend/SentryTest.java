package com.borasio_back.backend;

import io.sentry.Sentry;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest // 1. Transforma a classe em um teste de integração do Spring Boot
class SentryTest {
    @Test
    void testSentryError() {
        // 2. O Sentry já foi inicializado pela auto-configuração do Spring.
        //    Não é mais necessário carregar o dotenv ou chamar Sentry.init() aqui.

        try {
            throw new RuntimeException("Teste de erro Sentry a partir de um teste de integração");
        } catch (Exception e) {
            Sentry.captureException(e);
        }
    }
}

