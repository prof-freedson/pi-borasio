import { logError } from './logger';

describe('logError', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('deve logar erro como string', () => {
    logError('erro simples');
    expect(console.error).toHaveBeenCalledWith('[Erro]:', 'erro simples');
  });

  it('deve logar erro como Error', () => {
    const err = new Error('mensagem de erro');
    logError(err);
    expect(console.error).toHaveBeenCalledWith('[Erro]:', 'mensagem de erro');
  });

  it('deve logar erro com contexto', () => {
    logError('erro com contexto', 'Login');
    expect(console.error).toHaveBeenCalledWith('[Erro][Login]:', 'erro com contexto');
  });
});
