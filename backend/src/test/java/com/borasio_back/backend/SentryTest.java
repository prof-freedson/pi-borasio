package com.borasio_back.backend;

import io.sentry.Sentry;
import org.junit.jupiter.api.Test;

class SentryTest {

    @Test
    void testSentryError() {
        // Este é um teste unitário, ele não inicia o Spring.
        // Inicializamos o Sentry manualmente apenas para este teste.
        String sentryDsn = System.getenv("SENTRY_DSN_TEST");

        if (sentryDsn == null || sentryDsn.isEmpty()) {
            System.out.println("AVISO: Variável de ambiente SENTRY_DSN_TEST não definida. Pulando teste do Sentry.");
            return;
        }

        Sentry.init(options -> {
            options.setDsn(sentryDsn);
            options.setDebug(true); 
        });

        try {
            throw new RuntimeException("Teste de erro Sentry a partir de um teste UNITÁRIO");
        } catch (Exception e) {
            System.out.println("Capturando e enviando exceção para o Sentry...");
            Sentry.captureException(e);
            System.out.println("Evento enviado. Aguardando o fechamento do Sentry...");
            // Sentry.close() é crucial para esperar o envio em background
            Sentry.close(); // Usando a versão sem argumentos
            System.out.println("Sentry fechado.");
        }
    }
}