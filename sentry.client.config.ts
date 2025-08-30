import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  // environment: process.env.NODE_ENV, // opcional
  // release: "pi-borasio@1.0.0", // opcional
});

