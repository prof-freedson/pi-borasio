'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function EscolhaUsuarioPage() {
  const [tipoUsuario, setTipoUsuario] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const acao = searchParams.get('acao') // 'login', 'cadastro' ou 'cadastromotorista'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!tipoUsuario) {
      alert('Selecione uma opção.')
      return
    }

    // Salva o tipo no localStorage
    localStorage.setItem('tipoUsuario', tipoUsuario)

    let rotaFinal = ''

    if (tipoUsuario === 'motorista') {
      if (acao === 'cadastro' || acao === 'cadastromotorista') {
        rotaFinal = 'pessoalmotorista/cadastromotorista'
      } else {
        rotaFinal = 'pessoalmotorista/loginmotorista'
      }
    } else { // passageiro
      if (acao === 'cadastro') {
        rotaFinal = 'pessoal/cadastro'
      } else {
        rotaFinal = 'pessoal/login'
      }
    }

    router.push(`/${rotaFinal}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">Bem-vindo(a)!</h1>
        <label className="block">
          <span className="text-gray-700 font-medium">Você é:</span>
          <select
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            required
          >
            <option value="">Selecione uma opção</option>
            <option value="passageiro">Passageiro</option>
            <option value="motorista">Motorista</option>
          </select>
        </label>
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition"
        >
          Continuar
        </button>
      </form>
    </div>
  )
}
