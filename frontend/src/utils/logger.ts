// Utilitário simples de log
export function logError(error: unknown, context?: string) {
  const message = typeof error === 'string' ? error : (error instanceof Error ? error.message : JSON.stringify(error));
  if (context) {
    console.error(`[Erro][${context}]:`, message);
  } else {
    console.error('[Erro]:', message);
  }
}
