
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ResetarSenhaForm() {
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)
  const searchParams = useSearchParams()
  const [token, setToken] = useState('')

  useEffect(() => {
    const t = searchParams.get('token')
    if (t) setToken(t)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensagem('')

    if (novaSenha !== confirmarNovaSenha) {
      setMensagem('As senhas não coincidem. Por favor, digite novamente.')
      return
    }

    if (!token) {
      setMensagem('Token de redefinição não encontrado. Verifique o link.')
      return
    }

    setCarregando(true)
    try {
      const res = await fetch('http://localhost:8080/api/password-recovery/reset?token=' + token + '&newPassword=' + encodeURIComponent(novaSenha), {
        method: 'POST',
      })
      if (res.ok) {
        setMensagem('Senha redefinida com sucesso!')
      } else {
        setMensagem('Erro ao redefinir senha. O link pode ter expirado.')
      }
    } catch {
      setMensagem('Erro de conexão. Tente novamente.')
    }
    setCarregando(false)
  }

  return (
    <main className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-4">
      <div className="bg-green-50 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-green-800 text-center">
          Redefinir Senha
        </h2>

        {mensagem && (
          <div className={`mb-4 p-3 rounded text-sm ${
            mensagem.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {mensagem}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-green-800 mb-1" htmlFor="novaSenha">
              Nova Senha
            </label>
            <input
              type="password"
              id="novaSenha"
              value={novaSenha}
              onChange={e => setNovaSenha(e.target.value)}
              className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-green-800 mb-1" htmlFor="confirmarNovaSenha">
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              id="confirmarNovaSenha"
              value={confirmarNovaSenha}
              onChange={e => setConfirmarNovaSenha(e.target.value)}
              className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={carregando || novaSenha === '' || confirmarNovaSenha === ''}
            className={`w-full bg-green-800 text-white py-3 rounded hover:bg-green-900 transition ${
              carregando ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {carregando ? 'Redefinindo...' : 'Redefinir Senha'}
          </button>
        </form>

        <p className="text-center text-sm text-green-900 mt-4">
          <a href="/pessoal/login" className="hover:underline text-green-700 font-medium">
            Voltar para o Login
          </a>
        </p>
      </div>
    </main>
  )
}