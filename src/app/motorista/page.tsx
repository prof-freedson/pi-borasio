"use client"

import React, { useState } from 'react'

export default function Motorista() {
  const [modoEdicao, setModoEdicao] = useState(false)
  const [email, setEmail] = useState('joaoribamar@gmail.com')
  const [telefone, setTelefone] = useState('(98) 98745-3629')
  const [cnh, setCnh] = useState('12345678900')

  const salvarEdicao = () => {
    setModoEdicao(false)
    alert('Perfil atualizado com sucesso!')
  }

  return (
    <div className="min-h-screen flex flex-col items-center space-y-10 bg-[#DAF3D7] bg-cover bg-center">
      <div className='bg-white/50 p-20'>
        {/* Perfil */}
        <div className="flex gap-8 items-center mt-10 mb-10">
          <img
            src="https://media.istockphoto.com/id/1264589335/pt/foto/school-bus-driver.jpg?s=612x612&w=0&k=20&c=ofVI950kPXaZa6eSeChGpmSANsA20C64OSfJOrT39bM="
            className="w-52 h-52 rounded-full object-cover"
            alt="Foto do motorista"
          />
          <div className="flex flex-col border-2  text-[#004d2b] rounded-2xl p-2">
            <h1 className="text-4xl text-[#004d2b] font-bold">João Ribamar</h1>
            <h2 className="text-2xl text-[#000000]">Motorista</h2>
          </div>
        </div>

        {/* Informações da Conta */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md ml-8 mt-10 mb-10 space-y-4">
          <h1 className="text-xl text-[#004d2b] font-bold text-center">Informações da Conta</h1>

          {modoEdicao ? (
            <>
              <div>
                <label className="block text-gray-600 text-sm">E-mail:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border w-full p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm">Telefone:</label>
                <input
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="border w-full p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm">CNH:</label>
                <input
                  type="text"
                  value={cnh}
                  onChange={(e) => setCnh(e.target.value)}
                  className="border w-full p-2 rounded"
                />
              </div>
              <button
                onClick={salvarEdicao}
                className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 w-full rounded-full"
              >
                Salvar
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-gray-600 text-sm">E-mail:</label>
                <h2 className="text-lg">{email}</h2>
              </div>
              <div>
                <label className="block text-gray-600 text-sm">Telefone:</label>
                <h2 className="text-lg">{telefone}</h2>
              </div>
              <div>
                <label className="block text-gray-600 text-sm">CNH:</label>
                <h2 className="text-lg">{cnh}</h2>
              </div>
              <button
                onClick={() => setModoEdicao(true)}
                className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 w-full rounded-full"
              >
                Editar Perfil
              </button>
            </>
          )}
        </div>

        {/* Veículo */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md ml-8 space-y-2">
          <h1 className="text-xl text-green-800 font-bold text-center mb-4">Veículo</h1>
          <div className="text-center">
            <h2 className="text-lg text-gray-800">Volkswagen Gol</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
