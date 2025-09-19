package com.borasio_back.backend.config;

import io.sentry.Sentry;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SentryConfig {
    public SentryConfig() {
        // Substitua pelo seu DSN do Sentry
        String sentryDsn = "https://SEU_DSN_AQUI.ingest.sentry.io/PROJECT_ID";
        Sentry.init(options -> {
            options.setDsn(sentryDsn);
            options.setTracesSampleRate(1.0);
        });
    }
}
