// Teste para verificar se o jest.config.js está configurado corretamente
import * as jestConfig from './jest.config.js';

describe('Configuração do Jest', () => {
  it('deve ter o preset correto', () => {
    expect((jestConfig as any).preset).toBe('ts-jest');
  });

  it('deve usar o ambiente de teste node', () => {
    expect((jestConfig as any).testEnvironment).toBe('node');
  });

  it('deve coletar cobertura de testes', () => {
    expect((jestConfig as any).collectCoverage).toBe(true);
  });

  it('deve definir o diretório de cobertura', () => {
    expect((jestConfig as any).coverageDirectory).toBe('coverage');
  });

  it('deve ter as extensões de arquivos corretas', () => {
    expect((jestConfig as any).moduleFileExtensions).toEqual(
      expect.arrayContaining(['ts', 'tsx', 'js', 'jsx', 'json', 'node'])
    );
  });
});
