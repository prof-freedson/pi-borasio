"use client"

import React, { useState } from 'react'

// Importando FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faIdCard, faCar, faMapMarkerAlt, faIdBadge, faUser, faCarSide, faPalette, faGasPump } from '@fortawesome/free-solid-svg-icons'

export default function Motorista() {
  const [modoEdicao, setModoEdicao] = useState(false)

  const [nome, setNome] = useState('João Ribamar')
  const [email, setEmail] = useState('joaoribamar@gmail.com')
  const [telefone, setTelefone] = useState('(98) 98745-3629')
  const [cnh, setCnh] = useState('12345678900')
  const [cpf, setCpf] = useState('123.456.789-00')
  const [endereco, setEndereco] = useState('Rua das Flores, 123 - Centro')

  // Info veículo
  const [marca, setMarca] = useState('Volkswagen')
  const [modelo, setModelo] = useState('Gol')
  const [placa, setPlaca] = useState('ABC1D23')
  const [cor, setCor] = useState('Prata')
  const [combustivel, setCombustivel] = useState('Flex')

  const salvarEdicao = () => {
    setModoEdicao(false)
    alert('Perfil atualizado com sucesso!')
  }

  return (
    <div className="min-h-screen flex flex-col items-center space-y-10 bg-[#DAF3D7] bg-cover bg-center">
      
      {/* Perfil */}
      <div className="bg-white/50 w-1/2 mb-1 items-center rounded-2xl flex mt-20 justify-between">
        <img
          src="https://media.istockphoto.com/id/1264589335/pt/foto/school-bus-driver.jpg?s=612x612&w=0&k=20&c=ofVI950kPXaZa6eSeChGpmSANsA20C64OSfJOrT39bM="
          className="w-32 h-32 rounded-full object-cover"
          alt="Foto do motorista"
        />
        <div className="flex flex-col text-[#004d2b] rounded-2xl p-1">
          <h1 className="text-4xl text-[#004d2b] font-bold">{nome}</h1>
          <h2 className="text-2xl text-[#000000]">Motorista</h2>
        </div>
      </div>

      {/* Informações Conta */}
      <div className="bg-white/50 p-6 rounded-2xl shadow-lg w-1/2 mb-1 space-y-4">
        <h1 className="text-3xl border-2 p-3 text-[#004d2b] font-bold text-center rounded-2xl">Informações da Conta</h1>

        {modoEdicao ? (
          <>
            {/* Nome */}
            <div>
              <label className="block text-gray-600 text-sm">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-green-800" /> Nome:
              </label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="border w-full p-2 rounded" />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-gray-600 text-sm">
                <FontAwesomeIcon icon={faPhone} className="mr-2 text-green-800" /> Telefone:
              </label>
              <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="border w-full p-2 rounded" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 text-sm">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-green-800" /> E-mail:
              </label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border w-full p-2 rounded" />
            </div>

            {/* CNH, CPF, Endereço */}
            <div className="space-y-2">
              <div>
                <label className="block text-gray-600 text-sm">
                  <FontAwesomeIcon icon={faIdCard} className="mr-2 text-green-800" /> CNH:
                </label>
                <input type="text" value={cnh} onChange={(e) => setCnh(e.target.value)} className="border w-full p-2 rounded" />
              </div>

              <div>
                <label className="block text-gray-600 text-sm">
                  <FontAwesomeIcon icon={faIdBadge} className="mr-2 text-green-800" /> CPF:
                </label>
                <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} className="border w-full p-2 rounded" />
              </div>

              <div>
                <label className="block text-gray-600 text-sm">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-green-800" /> Endereço:
                </label>
                <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="border w-full p-2 rounded" />
              </div>
            </div>

            <button onClick={salvarEdicao} className="bg-green-800 hover:bg-green-900 text-white font-bold p-2 ml-45 w-1/2 mt-4">Salvar</button>
          </>
        ) : (
          <>
            <div>
              <label className="block text-gray-600 text-sm">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-green-800" /> Nome:
              </label>
              <h2 className="text-lg">{nome}</h2>
            </div>

            <div>
              <label className="block text-gray-600 text-sm">
                <FontAwesomeIcon icon={faPhone} className="mr-2 text-green-800" /> Telefone:
              </label>
              <h2 className="text-lg">{telefone}</h2>
            </div>

            <div>
              <label className="block text-gray-600 text-sm">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-green-800" /> E-mail:
              </label>
              <h2 className="text-lg">{email}</h2>
            </div>

            <div>
              <label className="block text-gray-600 text-sm">
                <FontAwesomeIcon icon={faIdCard} className="mr-2 text-green-800" /> CNH:
              </label>
              <h2 className="text-lg">{cnh}</h2>
            </div>

            <div>
              <label className="block text-gray-600 text-sm">
                <FontAwesomeIcon icon={faIdBadge} className="mr-2 text-green-800" /> CPF:
              </label>
              <h2 className="text-lg">{cpf}</h2>
            </div>

            <div>
              <label className="block text-gray-600 text-sm">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-green-800" /> Endereço:
              </label>
              <h2 className="text-lg">{endereco}</h2>
            </div>

            <button onClick={() => setModoEdicao(true)} className="bg-green-800 hover:bg-green-900 text-white font-bold w-1/2 p-2 ml-45">Editar Perfil</button>
          </>
        )}
      </div>

      {/* Informações Veículo */}
      <div className="bg-white/50 p-6 rounded-2xl shadow-lg w-1/2 mb-5">
        <h1 className="text-xl text-green-800 font-bold rounded-2xl border-2 p-3 mb-5">Veículo</h1>

        {modoEdicao ? (
          <div className="flex flex-wrap gap-4">
            <div className="w-1/5 flex items-center">
              <FontAwesomeIcon icon={faCarSide} className="mr-2 text-green-800" />
              <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Marca" className="border w-full p-2 rounded" />
            </div>
            <div className="w-1/5 flex items-center">
              <FontAwesomeIcon icon={faCar} className="mr-2 text-green-800" />
              <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} placeholder="Modelo" className="border w-full p-2 rounded" />
            </div>
            <div className="w-1/5 flex items-center">
              <FontAwesomeIcon icon={faIdBadge} className="mr-2 text-green-800" />
              <input type="text" value={placa} onChange={(e) => setPlaca(e.target.value)} placeholder="Placa" className="border w-full p-2 rounded" />
            </div>
            <div className="w-1/5 flex items-center">
              <FontAwesomeIcon icon={faPalette} className="mr-2 text-green-800" />
              <input type="text" value={cor} onChange={(e) => setCor(e.target.value)} placeholder="Cor" className="border w-full p-2 rounded" />
            </div>
            <div className="w-1/5 flex items-center">
              <FontAwesomeIcon icon={faGasPump} className="mr-2 text-green-800" />
              <input type="text" value={combustivel} onChange={(e) => setCombustivel(e.target.value)} placeholder="Combustível" className="border w-full p-2 rounded" />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            <div className="w-1/5"><FontAwesomeIcon icon={faCarSide} className="mr-2 text-green-800" /> {marca}</div>
            <div className="w-1/5"><FontAwesomeIcon icon={faCar} className="mr-2 text-green-800" /> {modelo}</div>
            <div className="w-1/5"><FontAwesomeIcon icon={faIdBadge} className="mr-2 text-green-800" /> {placa}</div>
            <div className="w-1/5"><FontAwesomeIcon icon={faPalette} className="mr-2 text-green-800" /> {cor}</div>
            <div className="w-1/5"><FontAwesomeIcon icon={faGasPump} className="mr-2 text-green-800" /> {combustivel}</div>
          </div>
        )}
      </div>
    </div>
  )
}
