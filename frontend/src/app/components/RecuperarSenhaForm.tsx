'use client'

import { useState } from 'react'

export default function RecuperarSenhaForm() {
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState(['', '', '', '', '', ''])
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [storedCodigo, setStoredCodigo] = useState('') // New state to store the generated code

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setMensagem('')
    try {
      // Simulate API call and code generation
      await new Promise(resolve => setTimeout(resolve, 1000))
      const novoCodigo = Math.floor(100000 + Math.random() * 900000).toString()
      setStoredCodigo(novoCodigo)
      alert(`Código de verificação enviado para seu e-mail: ${novoCodigo}`) // Display the code
      setMensagem('Código de verificação enviado para seu e-mail. Por favor, verifique a mensagem.')
    } catch {
      setMensagem('Erro ao solicitar recuperação. Tente novamente.')
    }
    setCarregando(false)
  }

  const handleVerificarCodigo = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    const codigoVerificacao = codigo.join('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (codigoVerificacao === storedCodigo) {
        setMensagem('Código verificado com sucesso! Redirecionando para a página de reset de senha...')
        setTimeout(() => {
          // Redirect to the password reset page as requested
          window.location.href = 'resetar-senha'
        }, 2000)
      } else {
        setMensagem('Código inválido. Tente novamente.')
      }
    } catch {
      setMensagem('Ocorreu um erro durante a verificação. Tente novamente.')
    }

    setCarregando(false)
  }

  const handleCodigoChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newCodigo = [...codigo]
    newCodigo[index] = value
    setCodigo(newCodigo)

    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`codigo-${index + 1}`) as HTMLInputElement
      if (nextInput) nextInput.focus()
    }
  }

  const handleCodigoKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && codigo[index] === '' && index > 0) {
      const prevInput = document.getElementById(`codigo-${index - 1}`) as HTMLInputElement
      if (prevInput) prevInput.focus()
    }
  }

  return (
    <main className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-4">
      <div className="bg-green-50 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-green-800 text-center">
          Recuperar Senha
        </h2>

        {mensagem && (
          <div className={`mb-4 p-3 rounded text-sm ${
            mensagem.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {mensagem}
          </div>
        )}

        <form onSubmit={e => e.preventDefault()}>
          <div className="flex items-end space-x-2 mb-4">
            <div className="flex-grow">
              <label className="block text-green-800 mb-1" htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-green-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleSubmitEmail}
              disabled={carregando}
              className={`bg-green-800 text-white py-3 px-4 rounded hover:bg-green-900 transition ${
                carregando ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              style={{ height: 'fit-content' }}
            >
              {carregando ? 'Enviando...' : 'Enviar'}
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-green-800 mb-2">
              Código de verificação
            </label>
            <div className="flex justify-start space-x-2 mb-4">
              {codigo.map((digit, index) => (
                <input
                  key={index}
                  id={`codigo-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleCodigoChange(index, e.target.value)}
                  onKeyDown={e => handleCodigoKeyDown(index, e)}
                  className="w-12 h-12 border border-green-300 rounded text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleVerificarCodigo}
              disabled={carregando || codigo.some(d => d === '')}
              className={`w-full bg-green-800 text-white py-3 rounded hover:bg-green-900 transition ${
                carregando ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {carregando ? 'Verificando...' : 'Recuperar Senha'}
            </button>
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