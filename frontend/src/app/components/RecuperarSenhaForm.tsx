'use client'

import { useState } from 'react'

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
        setMensagem('E-mail de recuperação enviado! Verifique sua caixa de entrada.')
      } else {
        const data = await res.text()
        setMensagem('Erro: ' + data)
      }
    } catch {
      setMensagem('Erro ao solicitar recuperação. Tente novamente.')
    }
    setCarregando(false)
  }

  return (
    <main className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-4">
      <div className="bg-green-50 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-green-800 text-center">
          Recuperar Senha
        </h2>

        {mensagem && (
          <div className={`mb-4 p-3 rounded text-sm flex items-center gap-2 ${
            mensagem.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <span role="img" aria-label="emoji" className="text-lg">
              {mensagem.includes('sucesso') ? '✔️' : '❌'}
            </span>
            {mensagem}
          </div>
        )}

        <form onSubmit={handleSubmitEmail}>
          <div className="space-y-4">
            <div>
              <label className="block text-green-800 mb-1" htmlFor="email">
                E-mail
              </label>
              <div className="flex items-end gap-2">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <button
                  type="submit"
                  disabled={carregando}
                  className={`bg-green-800 text-white py-3 px-4 rounded hover:bg-green-900 transition ${
                    carregando ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {carregando ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </div>
          </div>
        </form>

        <p className="text-center text-sm text-green-900 mt-4">
          Lembrou sua senha?{' '}
          <a href="/pessoal/login" className="hover:underline text-green-700 font-medium">
            Fazer login
          </a>
        </p>
      </div>
    </main>
  )
}