'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Lock, ShieldCheck, ArrowLeft, RefreshCw, CheckCircle, XCircle, Loader2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function ResetarSenhaForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tokenDaURL = searchParams?.get('token') || '';
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)

  // Função para validar força da senha
  function validarForcaSenha(senha: string) {
    const requisitos = {
      length: senha.length >= 8,
      upper: /[A-Z]/.test(senha),
      lower: /[a-z]/.test(senha),
      number: /[0-9]/.test(senha),
      special: /[^A-Za-z0-9]/.test(senha),
    };
    return requisitos;
  }

  const requisitos = validarForcaSenha(novaSenha);
  const senhaForte = Object.values(requisitos).every(Boolean);
  const forcaPercentual = (Object.values(requisitos).filter(Boolean).length / 5) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensagem('')

    if (novaSenha !== confirmarNovaSenha) {
      setMensagem('erro: As senhas não coincidem. Por favor, digite novamente.')
      return
    }

    if (!tokenDaURL) {
      setMensagem('erro: Token de redefinição não encontrado. Verifique o link.')
      return
    }

    setCarregando(true)
    try {
      const res = await fetch('/api/resetar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenDaURL, novaSenha }),
      })
      if (res.ok) {
        setMensagem('sucesso: Senha redefinida com sucesso! Você já pode fazer login.')
        setTimeout(() => router.push('/pessoal/login'), 3000)
      } else {
        setMensagem('erro: Erro ao redefinir senha. O link pode ter expirado.')
      }
    } catch {
      setMensagem('erro: Erro de conexão. Tente novamente.')
    }
    setCarregando(false)
  }

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Decorative background elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
              <Lock className="w-8 h-8 text-[#004d2b]" />
            </div>
            <h2 className="text-3xl font-bold text-[#004d2b]">Nova Senha</h2>
            <p className="text-gray-500 mt-2">Crie uma senha forte e segura</p>
          </div>

          {mensagem && (
            <div className={`mb-6 p-4 rounded-2xl flex items-start gap-3 transition-all duration-300 ${mensagem.startsWith('sucesso')
                ? 'bg-green-50 text-green-700 border border-green-100'
                : 'bg-red-50 text-red-700 border border-red-100'
              }`}>
              {mensagem.startsWith('sucesso') ? (
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              )}
              <span className="text-sm font-medium">
                {mensagem.replace('sucesso: ', '').replace('erro: ', '')}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#004d2b] ml-1" htmlFor="novaSenha">
                Nova Senha
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#004d2b] transition-colors" />
                </div>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  id="novaSenha"
                  placeholder="••••••••"
                  value={novaSenha}
                  onChange={e => setNovaSenha(e.target.value)}
                  className="block w-full pl-11 pr-12 py-3.5 bg-white/50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#004d2b]/20 focus:border-[#004d2b] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {mostrarSenha ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {novaSenha && (
                <div className="mt-4 space-y-3">
                  <div className="flex gap-1 h-1.5 w-full">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 rounded-full transition-all duration-500 ${forcaPercentual >= step * 20
                            ? forcaPercentual <= 40 ? 'bg-red-400' : forcaPercentual <= 80 ? 'bg-yellow-400' : 'bg-green-500'
                            : 'bg-gray-100'
                          }`}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
                    <Requirement met={requisitos.length} label="8+ caracteres" />
                    <Requirement met={requisitos.upper} label="Letra maiúscula" />
                    <Requirement met={requisitos.lower} label="Letra minúscula" />
                    <Requirement met={requisitos.number} label="Número" />
                    <Requirement met={requisitos.special} label="Símbolo" />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#004d2b] ml-1" htmlFor="confirmarNovaSenha">
                Confirmar Senha
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <ShieldCheck className="h-5 w-5 text-gray-400 group-focus-within:text-[#004d2b] transition-colors" />
                </div>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  id="confirmarNovaSenha"
                  placeholder="••••••••"
                  value={confirmarNovaSenha}
                  onChange={e => setConfirmarNovaSenha(e.target.value)}
                  className="block w-full pl-11 pr-12 py-3.5 bg-white/50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#004d2b]/20 focus:border-[#004d2b] transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando || !senhaForte}
              className={`w-full bg-[#004d2b] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#003823] hover:shadow-lg active:scale-[0.98] ${carregando || !senhaForte ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {carregando ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Redefinindo...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  <span>Redefinir Senha</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-gray-100 text-center">
            <Link
              href="/pessoal/login"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#004d2b] hover:text-[#003823] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function Requirement({ met, label }: { met: boolean, label: string }) {
  return (
    <div className={`flex items-center gap-1.5 transition-colors ${met ? 'text-green-600' : 'text-gray-400'}`}>
      <div className={`w-1 h-1 rounded-full ${met ? 'bg-green-600' : 'bg-gray-300'}`} />
      <span>{label}</span>
      {met && <CheckCircle className="w-3 h-3" />}
    </div>
  )
}