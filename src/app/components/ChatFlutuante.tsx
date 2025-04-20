'use client'

import React, { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'

export default function ChatFlutuante() {
  const [mensagem, setMensagem] = useState('')
  const [aberto, setAberto] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Evita hydration errors garantindo que o componente só renderize no cliente
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {aberto ? (
        <div className="bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-yellow-400 w-[350px] max-h-[500px]">
          {/* Cabeçalho */}
          <div className="bg-yellow-500 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h2 className="font-bold text-sm">Atendente Virtual</h2>
                <p className="text-xs text-yellow-100">Online</p>
              </div>
            </div>
            <button 
              onClick={() => setAberto(false)} 
              className="text-white hover:text-yellow-200 font-bold text-lg transition-colors"
              aria-label="Fechar chat"
            >
              &times;
            </button>
          </div>

          {/* Mensagens */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-yellow-50" style={{ maxHeight: '300px' }}>
            <div className="flex items-start gap-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                className="w-6 h-6 rounded-full"
                alt="Atendente"
              />
              <div className="bg-yellow-200 p-2 rounded-xl text-sm max-w-[70%]">
                Olá! Sou o Vitorino! Como posso te ajudar?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-gray-200 p-2 rounded-xl text-sm max-w-[70%]">
                Quero saber mais sobre os planos.
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && mensagem.trim() && console.log('Mensagem enviada:', mensagem)}
            />
            <button 
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm transition-colors disabled:opacity-50"
              disabled={!mensagem.trim()}
              onClick={() => {
                if (mensagem.trim()) {
                  console.log('Mensagem enviada:', mensagem)
                  setMensagem('')
                }
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAberto(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105"
          aria-label="Abrir chat"
        >
          <MessageCircle size={32} />
          <span className="sr-only">Abrir chat</span>
        </button>
      )}
    </div>
  )
}