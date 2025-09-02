import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  // environment: process.env.NODE_ENV, // opcional
  // release: "pi-borasio@1.0.0", // opcional
});
// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
// ...existing code...
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;