import type { NextConfig } from "next";

// Importa o wrapper do Sentry
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig: NextConfig = {
  // Suas opções de configuração aqui
  outputFileTracingRoot: __dirname,
};

const sentryWebpackPluginOptions = {
  // Opções extras do Sentry (opcional)
  silent: true, // Suprime logs do Sentry durante o build
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);