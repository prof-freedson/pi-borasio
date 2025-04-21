"use client"

import React, { useState } from 'react'
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
    <div className="min-h-screen flex flex-col items-center space-y-10 bg-[#DAF3D7] bg-cover bg-center p-4">
      
      {/* Perfil */}
      <div className="bg-white w-full md:w-[80%] mb-1 flex flex-col md:flex-row items-center rounded-2xl mt-10 p-4 md:justify-between">
        <img
          src="https://media.istockphoto.com/id/1264589335/pt/foto/school-bus-driver.jpg?s=612x612&w=0&k=20&c=ofVI950kPXaZa6eSeChGpmSANsA20C64OSfJOrT39bM="
          className="w-32 h-32 rounded-full object-cover"
          alt="Foto do motorista"
        />
        <div className="flex flex-col text-[#004d2b] items-center md:items-start mt-4 md:mt-0">
          <h1 className="text-3xl md:text-4xl font-bold">{nome}</h1>
          <h2 className="text-xl md:text-2xl text-black">Motorista</h2>
        </div>
      </div>

      {/* Informações Conta */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full md:w-[80%] space-y-4">
        <h1 className="text-2xl md:text-3xl border-2 p-3 text-[#004d2b] font-bold text-center rounded-2xl">Informações da Conta</h1>

        {/* Área de informações */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10 ">
          {[
            { label: "Nome", value: nome, setValue: setNome, icon: faUser, type: "text" },
            { label: "Telefone", value: telefone, setValue: setTelefone, icon: faPhone, type: "text" },
            { label: "E-mail", value: email, setValue: setEmail, icon: faEnvelope, type: "email" },
            { label: "CNH", value: cnh, setValue: setCnh, icon: faIdCard, type: "text" },
            { label: "CPF", value: cpf, setValue: setCpf, icon: faIdBadge, type: "text" },
            { label: "Endereço", value: endereco, setValue: setEndereco, icon: faMapMarkerAlt, type: "text" }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <FontAwesomeIcon icon={item.icon} className="text-green-800" />
              {modoEdicao ? (
                <input
                  type={item.type}
                  value={item.value}
                  onChange={(e) => item.setValue(e.target.value)}
                  placeholder={item.label}
                  className="border w-full p-2 rounded bg-gray-100"
                />
              ) : (
                <span className="text-gray-700">{item.value}</span>
              )}
            </div>
          ))}
        </div>

        {modoEdicao ? (
          <button onClick={salvarEdicao} className="bg-green-800 hover:bg-green-900 text-white font-bold p-2 w-full mt-4">Salvar</button>
        ) : (
          <button onClick={() => setModoEdicao(true)} className="bg-green-800 hover:bg-green-900 text-white font-bold p-2 w-full mt-4">Editar Perfil</button>
        )}
      </div>

      {/* Informações Veículo */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full md:w-[80%] mb-5">
        <h1 className="text-xl md:text-2xl text-green-800 font-bold rounded-2xl border-2 p-3 mb-5">Veículo</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {[ 
            { placeholder: "Marca", value: marca, setValue: setMarca, icon: faCarSide },
            { placeholder: "Modelo", value: modelo, setValue: setModelo, icon: faCar },
            { placeholder: "Placa", value: placa, setValue: setPlaca, icon: faIdBadge },
            { placeholder: "Cor", value: cor, setValue: setCor, icon: faPalette },
            { placeholder: "Combustível", value: combustivel, setValue: setCombustivel, icon: faGasPump }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <FontAwesomeIcon icon={item.icon} className="text-green-800" />
              {modoEdicao ? (
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => item.setValue(e.target.value)}
                  placeholder={item.placeholder}
                  className="border w-full p-2 rounded bg-gray-100"
                />
              ) : (
                <span className="text-gray-700">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
