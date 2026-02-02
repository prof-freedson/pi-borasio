'use client'

import { useState } from 'react'
import { Mail, ArrowLeft, Send, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function RecuperarSenhaForm() {
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setMensagem('')
    try {
      const res = await fetch('http://localhost:8080/api/password-recovery/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setMensagem('sucesso: E-mail de recuperação enviado! Verifique sua caixa de entrada.')
      } else {
        const data = await res.text()
        setMensagem('erro: ' + data)
      }
    } catch {
      setMensagem('erro: Ocorreu um erro ao solicitar a recuperação. Tente novamente.')
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
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
              <Mail className="w-8 h-8 text-[#004d2b]" />
            </div>
            <h2 className="text-3xl font-bold text-[#004d2b]">Recuperar Senha</h2>
            <p className="text-gray-500 mt-2">Enviaremos um link para resetar sua senha</p>
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

          <form onSubmit={handleSubmitEmail} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#004d2b] ml-1" htmlFor="email">
                Seu e-mail
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#004d2b] transition-colors" />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-white/50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#004d2b]/20 focus:border-[#004d2b] transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className={`w-full bg-[#004d2b] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#003823] hover:shadow-lg active:scale-[0.98] ${carregando ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {carregando ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Enviar link de recuperação</span>
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
