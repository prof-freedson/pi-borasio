"use client"

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faIdCard, faCar, faMapMarkerAlt, faIdBadge, faUser, faCarSide, faPalette, faGasPump, faChair } from '@fortawesome/free-solid-svg-icons'

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
  const [assentos, setAssentos] = useState(5)
  const [arCondicionado, setArCondicionado] = useState(true)

  const [corridas, setCorridas] = useState([
    { passageiro: 'Maria Souza', localViagem: 'Avenida Brasil, 345' },
    { passageiro: 'Pedro Oliveira', localViagem: 'Rua da Paz, 123' },
    { passageiro: 'Ana Costa', localViagem: 'Avenida Independência, 678' }
  ])

  const denunciarCorrida = () => {
    alert('Corrida denunciada!')
  }

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

      {/* Informações da Conta */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full md:w-[80%] mb-5">
        <h1 className="text-2xl md:text-3xl border-2 p-3 text-[#004d2b] font-bold text-center rounded-2xl">Informações da Conta</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
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
                <div className="w-full">
                  <h2 className="text-sm font-bold text-gray-700 mb-2">{item.label}</h2>
                  <input
                    type={item.type}
                    value={item.value}
                    onChange={(e) => item.setValue(e.target.value)}
                    className="border w-full p-2 rounded bg-gray-100"
                  />
                </div>
              ) : (
                <div className="w-full">
                  <h2 className="text-sm font-bold text-gray-700 mb-2">{item.label}</h2>
                  <span className="text-gray-700">{item.value}</span>
                </div>
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

      {/* Informações do Veículo */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full md:w-[80%] mb-5">
        <h1 className="text-xl md:text-2xl text-green-800 font-bold rounded-2xl border-2 p-3 mb-5">Veículo</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[ 
            { label: "Marca", value: marca, setValue: setMarca, icon: faCarSide },
            { label: "Modelo", value: modelo, setValue: setModelo, icon: faCar },
            { label: "Placa", value: placa, setValue: setPlaca, icon: faIdBadge },
            { label: "Cor", value: cor, setValue: setCor, icon: faPalette },
            { label: "Combustível", value: combustivel, setValue: setCombustivel, icon: faGasPump },
            { label: "Assentos", value: String(assentos), setValue: (v: string) => setAssentos(Number(v)), icon: faChair },
            { label: "Ar Condicionado", value: arCondicionado ? "Sim" : "Não", setValue: (v: string) => setArCondicionado(v === "Sim"), icon: faCar }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <FontAwesomeIcon icon={item.icon} className="text-green-800" />
              {modoEdicao ? (
                <div className="w-full">
                  <h2 className="text-sm font-bold text-gray-700 mb-2">{item.label}</h2>
                  <input
                    type={item.label === "Assentos" ? "number" : "text"}
                    value={item.value}
                    onChange={(e) => item.setValue(e.target.value)}
                    className="border w-full p-2 rounded bg-gray-100"
                  />
                </div>
              ) : (
                <div className="w-full">
                  <h2 className="text-sm font-bold text-gray-700 mb-2">{item.label}</h2>
                  <span className="text-gray-700">{item.value}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Últimas Corridas */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full md:w-[80%] mb-5">
        <h1 className="text-xl md:text-2xl text-green-800 font-bold rounded-2xl border-2 p-3 mb-5">Últimas Corridas</h1>

        <div className="flex flex-col space-y-4">
          {corridas.map((corrida, index) => (
            <div key={index} className="flex flex-col space-y-2 border-2 border-gray-300 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUser} className="text-green-800" />
                <span className="text-lg font-bold">Passageiro:</span>
                <span>{corrida.passageiro}</span>
              </div>

              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-800" />
                <span className="text-lg font-bold">Local da Viagem:</span>
                <span>{corrida.localViagem}</span>
              </div>

              <div className="flex justify-center mt-4">
                <button onClick={denunciarCorrida} className="bg-yellow-800 hover:bg-yellow-900 text-white text-sm font-bold w-1/2 py-2 px-3 rounded">
                  Denunciar
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="bg-gray-800 text-white font-bold p-2 w-full mt-6" disabled>
          Mostrar Histórico Completo
        </button>
      </div>

    </div>
  )
}
