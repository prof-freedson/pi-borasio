'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent, ChangeEvent } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Eye, EyeOff, Zap, Mail, Lock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userType', 'passageiro');
      
      try { 
        window.dispatchEvent(new CustomEvent('authChanged', { 
          detail: { loggedIn: true, email: email, userType: 'passageiro' } 
        })); 
      } catch (e) {}
      
      router.push('/usuario');
    } catch (err: unknown) {
      setError('Ocorreu um erro ao fazer login');
      Sentry.captureException(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-100/50 to-transparent -z-10"></div>
      
      <div className="w-full max-w-md relative">
        <Link href="/" className="inline-flex items-center gap-2 text-[#004d2b] font-bold mb-8 hover:bg-white p-2 rounded-xl transition-all">
          <ChevronLeft className="w-5 h-5" /> Início
        </Link>
        
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-green-50">
          <div className="text-center mb-8">
            <div className="bg-[#004d2b] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#004d2b]/20">
              <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            </div>
            <h2 className="text-3xl font-black text-[#004d2b]">Boas-vindas!</h2>
            <p className="text-gray-500 font-medium">Faça login para começar a rodar</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-3">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-black text-[#004d2b] ml-1 uppercase tracking-wider" htmlFor="email">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className="w-full border-2 border-gray-100 bg-gray-50/50 p-4 pl-12 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#004d2b] focus:bg-white transition-all text-gray-800 font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-black text-[#004d2b] uppercase tracking-wider" htmlFor="senha">
                  Senha
                </label>
                <button
                  type="button"
                  onClick={() => router.push('/recuperar-senha')}
                  className="text-xs font-bold text-green-700 hover:text-[#004d2b] transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-2 border-gray-100 bg-gray-50/50 p-4 pl-12 pr-12 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#004d2b] focus:bg-white transition-all text-gray-800 font-medium"
                  required
                />
                <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600">
                  {mostrarSenha ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-black py-5 rounded-2xl transition-all duration-300 text-lg flex items-center justify-center gap-3 shadow-xl ${
                isLoading 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] shadow-yellow-400/20 active:scale-95'
              }`}
            > 
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-4 border-[#004d2b]/30 border-t-[#004d2b] rounded-full animate-spin"></div>
                  Entrando...
                </>
              ) : 'Entrar no BoraSiô'}
            </button>
          </form>
          
          <div className="text-center mt-10">
            <p className="text-gray-500 font-medium">
              Ainda não tem conta?{' '}
              <Link href="/pessoal/cadastro" className="text-[#004d2b] font-black hover:underline underline-offset-4 decoration-yellow-400 decoration-2">
                Crie a sua agora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}