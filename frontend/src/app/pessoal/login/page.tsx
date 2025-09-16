'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent, ChangeEvent } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validação simples
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      const errMsg = 'E-mail inválido';
      setError(errMsg);
      Sentry.captureException(new Error(errMsg));
      setIsLoading(false);
      return;
    }
    if (!password || password.length < 6) {
      const errMsg = 'A senha deve ter pelo menos 6 caracteres';
      setError(errMsg);
      Sentry.captureException(new Error(errMsg));
      setIsLoading(false);
      return;
    }

    try {
      // Simulação de chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Redirecionamento após login bem-sucedido
      router.push('/usuario');
    } catch (err: unknown) {
      setError('Ocorreu um erro ao fazer login');
      Sentry.captureException(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleForgotPassword = () => {
    // Lógica para redirecionar ou abrir modal de recuperação de senha
    alert('Redirecionando para recuperação de senha...');
  };

  return (
    <main className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-4">
      <div className="bg-green-50 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-green-800 text-center">Entrar</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-green-800 mb-1" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-green-800 mb-1" htmlFor="senha">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-green-800 text-white py-3 rounded hover:bg-green-900 transition ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          > 
            {isLoading ? 'Carregando...' : 'Login'}
          </button>
        </form>
        
        <div className="text-center mt-4 text-sm text-green-900">
          <span>Esqueceu a senha? </span>
          <button
            onClick={handleForgotPassword}
            className="text-green-700 hover:text-green-900 hover:underline font-medium transition-colors"
          >
            Recupere já!
          </button>
        </div>
        
        <p className="text-center text-sm text-green-900 mt-4">
          Não tem uma conta?{' '}
          <a href="/pessoal/cadastro" className="hover:underline text-green-700 font-medium">
            Cadastre-se
          </a>
        </p>
      </div>
    </main>
  );
}