import { logError } from './logger';

// Função para tratar erros em rotas ou componentes
export function handleError(error: unknown, context?: string) {
  logError(error, context);
  
}
