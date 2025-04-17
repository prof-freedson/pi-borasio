import React from 'react'

export default function Motorista() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 space-y-8 bg-[url('/motorista-fundo.png')] bg-cover bg-center">
      
      {/* Perfil */}
      <div className="flex gap-8 items-center">
        <img 
          src="https://media.istockphoto.com/id/1264589335/pt/foto/school-bus-driver.jpg?s=612x612&w=0&k=20&c=ofVI950kPXaZa6eSeChGpmSANsA20C64OSfJOrT39bM=" 
          className="w-52 h-52 rounded-full object-cover" 
          alt="Foto do motorista" 
        />
        <div className="flex flex-col border-2 bg-white/60 border-amber-50 rounded-2xl p-2">
          <h1 className="text-4xl text-green-800 font-bold">João Ribamar</h1>
          <h2 className="text-2xl text-green-800">Motorista</h2>
        </div>
      </div>

      {/* Informações da Conta */}
      <div className="bg-white/70 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-xl text-green-800 font-bold text-center">Informações da Conta</h1>
        
        <div>
          <label className="block text-gray-600 text-sm">E-mail:</label>
          <h2 className="text-lg">joaoribamar@gmail.com</h2>
        </div>

        <div>
          <label className="block text-gray-600 text-sm">Telefone:</label>
          <h2 className="text-lg">(98) 98745-3629</h2>
        </div>

        <div>
          <label className="block text-gray-600 text-sm">CNH:</label>
          <h2 className="text-lg">12345678900</h2>
        </div>

        <button className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-full w-full">
          Editar Perfil
        </button>
      </div>

      {/* Veículo */}
      <div className="bg-white/70 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-2">
        <h1 className="text-xl text-green-800 font-bold text-center mb-4">Veículo</h1>
        <div className="text-center">
          <h2 className="text-lg text-gray-800">Volkswagen Gol</h2>
        </div>
      </div>

    </div>
  )
}
