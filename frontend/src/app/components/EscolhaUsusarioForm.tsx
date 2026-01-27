'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { User, Car, ArrowRight, Zap } from 'lucide-react'

export default function EscolhaUsuarioForm() {
  const [tipoUsuario, setTipoUsuario] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const acao = searchParams.get('acao')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!tipoUsuario) {
      return
    }

    localStorage.setItem('tipoUsuario', tipoUsuario)

    let rotaFinal = ''

    if (tipoUsuario === 'motorista') {
      if (acao === 'cadastro' || acao === 'cadastromotorista') {
        rotaFinal = 'pessoalmotorista/cadastromotorista'
      } else {
        rotaFinal = 'pessoalmotorista/loginmotorista'
      }
    } else {
      if (acao === 'cadastro') {
        rotaFinal = 'pessoal/cadastro'
      } else {
        rotaFinal = 'pessoal/login'
      }
    }

    router.push(`/${rotaFinal}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#004d2b] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-400 rounded-full blur-[120px]"></div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] w-full max-w-lg relative z-10 border border-green-50">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6">
            <Zap className="w-8 h-8 text-[#004d2b] fill-[#004d2b]" />
          </div>
          <h1 className="text-3xl font-black text-[#004d2b] mb-2 leading-tight">Como você quer usar o BoraSiô?</h1>
          <p className="text-gray-500 font-medium">Escolha seu perfil para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <label 
              className={`relative flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${
                tipoUsuario === 'passageiro' 
                ? 'border-[#004d2b] bg-green-50 shadow-md' 
                : 'border-gray-100 bg-white hover:border-green-200'
              }`}
            >
              <input 
                type="radio" 
                name="userType" 
                value="passageiro" 
                className="sr-only"
                onChange={(e) => setTipoUsuario(e.target.value)}
              />
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-colors ${
                tipoUsuario === 'passageiro' ? 'bg-[#004d2b] text-white' : 'bg-green-100 text-[#004d2b]'
              }`}>
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className={`block font-bold text-lg ${tipoUsuario === 'passageiro' ? 'text-[#004d2b]' : 'text-gray-700'}`}>Passageiro</span>
                <span className="text-sm text-gray-500">Quero viajar com segurança e economia</span>
              </div>
              {tipoUsuario === 'passageiro' && (
                <div className="w-6 h-6 bg-[#004d2b] rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              )}
            </label>

            <label 
              className={`relative flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${
                tipoUsuario === 'motorista' 
                ? 'border-[#004d2b] bg-green-50 shadow-md' 
                : 'border-gray-100 bg-white hover:border-green-200'
              }`}
            >
              <input 
                type="radio" 
                name="userType" 
                value="motorista" 
                className="sr-only"
                onChange={(e) => setTipoUsuario(e.target.value)}
              />
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-colors ${
                tipoUsuario === 'motorista' ? 'bg-[#004d2b] text-white' : 'bg-green-100 text-[#004d2b]'
              }`}>
                <Car className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className={`block font-bold text-lg ${tipoUsuario === 'motorista' ? 'text-[#004d2b]' : 'text-gray-700'}`}>Motorista</span>
                <span className="text-sm text-gray-500">Quero oferecer caronas e ganhar dinheiro</span>
              </div>
              {tipoUsuario === 'motorista' && (
                <div className="w-6 h-6 bg-[#004d2b] rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              )}
            </label>
          </div>

          <button
            type="submit"
            disabled={!tipoUsuario}
            className={`w-full font-black py-5 rounded-2xl transition-all duration-300 text-lg flex items-center justify-center gap-2 shadow-xl ${
              tipoUsuario 
              ? 'bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] transform hover:-translate-y-1 active:scale-95 shadow-yellow-400/20' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            Continuar para {acao === 'cadastro' ? 'Cadastro' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}