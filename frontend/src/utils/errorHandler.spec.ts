import { handleError } from './errorHandler';
import * as logger from './logger';

describe('handleError', () => {
  beforeEach(() => {
    jest.spyOn(logger, 'logError').mockImplementation(() => {});
  });

  afterEach(() => {
    (logger.logError as jest.Mock).mockRestore();
  });

  it('deve chamar logError com erro simples', () => {
    handleError('erro simples');
    expect(logger.logError).toHaveBeenCalledWith('erro simples', undefined);
  });

  it('deve chamar logError com erro e contexto', () => {
    handleError('erro com contexto', 'Cadastro');
    expect(logger.logError).toHaveBeenCalledWith('erro com contexto', 'Cadastro');
  });
});

