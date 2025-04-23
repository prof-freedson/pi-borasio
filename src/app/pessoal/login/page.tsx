'use client'; // Adicione esta linha no topo do arquivo

import { useRouter } from 'next/navigation'; // Alterado de next/router para next/navigation
import { useState, FormEvent, ChangeEvent } from 'react';

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

    try {
      // Simulação de chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionamento após login bem-sucedido
      router.push('/usuario');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Ocorreu um erro ao fazer login');
      } else {
        setError('Ocorreu um erro desconhecido ao fazer login');
      }
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

  return (
    <main className="min-h-screen bg-green-100 flex flex-col items-center justify-center">
      <div className="bg-green-50 mt-10 p-8 rounded-xl shadow-lg w-full max-w-md">
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
        <p className="text-center text-sm text-green-900 mt-4">
          Não tem uma conta?{' '}
          <a href="/pessoal/cadastro" className="hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </main>
  );
}