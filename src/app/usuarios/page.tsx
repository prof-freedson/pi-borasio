"use client"

import {
  faClock,
  faCommentDots,
  faCreditCard,
  faEnvelope,
  faIdBadge,
  faMapMarkerAlt,
  faMoneyBill,
  faPhone,
  faRoute
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

type Corrida = {
  origem: string
  destino: string
  data: string
  valor: string
}

type PerfilProps = {
  nome: string
  email: string
  telefone: string
  cpf: string
  endereco: string
  pagamentos: string[]
  corridasAnteriores: Corrida[]
  fotoPerfil: string
}

const perfisIniciais: PerfilProps[] = [
  {
    nome: 'Selina Kyle',
    email: 'mulhergato@exemplo.com',
    telefone: '(98) 98877-8999',
    cpf: '123.456.789-00',
    endereco: 'Rua dos Gatos, 123 - Centro',
    pagamentos: ['Cartão de Crédito', 'Pix'],
    corridasAnteriores: [
      { origem: 'Rua das Flores - Centro', destino: 'Rua B - Maiobão', data: '2025-04-01', valor: 'R$ 20,00' },
      { origem: 'Rua Primavera - Santa Clara', destino: 'Rua Outono - Vila Nova', data: '2025-04-10', valor: 'R$ 25,00' }
    ],
    fotoPerfil: '/img/mulher-gato2.jpg'
  },
  {
    nome: 'Bruce Wayne',
    email: 'batman@wayne.com',
    telefone: '(98) 91234-5678',
    cpf: '987.654.321-00',
    endereco: 'Mansão Wayne, Gotham City',
    pagamentos: ['Débito', 'Dinheiro'],
    corridasAnteriores: [
      { origem: 'Mansão Wayne', destino: 'Caverna Secreta', data: '2025-04-02', valor: 'R$ 0,00' }
    ],
    fotoPerfil: '/img/Elon.webp'
  },
  {
    nome: 'Diana Prince',
    email: 'wonderwoman@exemplo.com',
    telefone: '(98) 98888-1122',
    cpf: '456.789.123-99',
    endereco: 'Av. da Justiça, 500 - Centro',
    pagamentos: ['Cartão de Débito'],
    corridasAnteriores: [
      { origem: 'Museu Nacional', destino: 'Av. Central - São Luís', data: '2025-04-03', valor: 'R$ 30,00' }
    ],
    fotoPerfil: '/img/mulher-maravilha1.jpg'
  },
  {
    nome: 'Clark Kent',
    email: 'superman@dailyplanet.com',
    telefone: '(98) 98765-4321',
    cpf: '321.654.987-77',
    endereco: 'Rua Krypton, 101 - Vila Esperança',
    pagamentos: ['Pix'],
    corridasAnteriores: [
      { origem: 'Vila Esperança', destino: 'Centro Administrativo', data: '2025-04-04', valor: 'R$ 15,00' }
    ],
    fotoPerfil: '/img/superman.webp'
  },
  {
    nome: 'Barry Allen',
    email: 'flash@laboratorio.com',
    telefone: '(98) 98123-4455',
    cpf: '789.123.456-55',
    endereco: 'Rua Relâmpago, 98 - Bairro Rápido',
    pagamentos: ['Cartão de Crédito', 'Pix'],
    corridasAnteriores: [
      { origem: 'Laboratório Central', destino: 'Shopping Light', data: '2025-04-05', valor: 'R$ 18,00' }
    ],
    fotoPerfil: '/img/flash.jpg'
  },
  {
    nome: 'Arthur Curry',
    email: 'aquaman@atlântida.com',
    telefone: '(98) 98999-7788',
    cpf: '147.258.369-33',
    endereco: 'Av. Oceano Atlântico, 7 - Mar Azul',
    pagamentos: ['Cartão de Débito', 'Pix'],
    corridasAnteriores: [
      { origem: 'Porto Azul', destino: 'Aquário Municipal', data: '2025-04-07', valor: 'R$ 22,00' }
    ],
    fotoPerfil: '/img/aguaman.jpg'
  }
]

export default function ListaPerfis() {
  const [perfis, setPerfis] = useState(perfisIniciais)

  return (
    <div className="min-h-screen bg-[#DAF3D7] p-4 space-y-10">
      {perfis.map((perfil, index) => (
        <PerfilUsuario key={index} {...perfil} />
      ))}
    </div>
  )
}

function PerfilUsuario({
  nome,
  email,
  telefone,
  cpf,
  endereco,
  pagamentos,
  corridasAnteriores,
  fotoPerfil
}: PerfilProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] mx-auto space-y-4">
      <div className="flex items-center space-x-4">
        <img src={fotoPerfil} alt={`Foto de ${nome}`} className="w-20 h-20 rounded-full object-cover" />
        <div>
          <h1 className="text-2xl font-bold text-[#004d2b]">{nome}</h1>
          <p className="text-lg text-gray-600">Usuário</p>
        </div>
      </div>

      <div className="text-gray-800 space-y-1">
        <p><FontAwesomeIcon icon={faPhone} className="mr-2 text-green-800" /> {telefone}</p>
        <p><FontAwesomeIcon icon={faEnvelope} className="mr-2 text-green-800" /> {email}</p>
        <p><FontAwesomeIcon icon={faIdBadge} className="mr-2 text-green-800" /> {cpf}</p>
        <p><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-green-800" /> {endereco}</p>
        <p><FontAwesomeIcon icon={faCreditCard} className="mr-2 text-green-800" /> Pagamento: {pagamentos.join(', ')}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-green-800 border-b pb-1 mb-2">
          <FontAwesomeIcon icon={faRoute} className="mr-2" />Corridas Anteriores
        </h2>
        {corridasAnteriores.map((c, i) => (
          <div key={i} className="border p-2 mb-2 rounded">
            <p><strong>Origem:</strong> {c.origem}</p>
            <p><strong>Destino:</strong> {c.destino}</p>
            <p><FontAwesomeIcon icon={faClock} className="mr-1" /> {c.data} | <FontAwesomeIcon icon={faMoneyBill} className="ml-2 mr-1" /> {c.valor}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="bg-yellow-300 text-[#004d2b] w-1/2 p-3 rounded-2xl font-bold hover:bg-yellow-400">
          <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
          Entrar em Contato com o Usuario
        </button>
      </div>
    </div>
  )
}
