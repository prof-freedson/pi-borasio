package com.borasio_back.backend;

import io.sentry.Sentry;
import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.Test;

class SentryTest {
    @Test
    void testSentryError() {
        Dotenv dotenv = Dotenv.configure().filename("env.local").load();
        String dsn = dotenv.get("NEXT_PUBLIC_SENTRY_DSN");
        if (dsn == null || dsn.isEmpty()) {
            throw new IllegalStateException("NEXT_PUBLIC_SENTRY_DSN não está configurado no env.local.");
        }
        Sentry.init(options -> options.setDsn(dsn));

        try {
            throw new RuntimeException("Teste de erro Sentry");
        } catch (Exception e) {
            Sentry.captureException(e);
        }
    }
}
