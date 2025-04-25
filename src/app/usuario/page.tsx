"use client"

import {
  faClock, faCommentDots, faCreditCard, faEdit, faEnvelope,
  faIdBadge, faMapMarkerAlt, faMoneyBill, faPhone, faRoute,
  faTimes, faUser, faCarAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Usuario() {
  const [modoEdicao, setModoEdicao] = useState(false)
  const [selectedCorrida, setSelectedCorrida] = useState<any>(null)
  const searchParams = useSearchParams()

  const [nome, setNome] = useState('Sarah Lima Pereira')
  const [email, setEmail] = useState('Sarah@exemplo.com')
  const [telefone, setTelefone] = useState('(98) 98877-8999')
  const [cpf, setCpf] = useState('123.456.789-00')
  const [endereco, setEndereco] = useState('Rua das Flores, 123 - Centro')

  const [pagamentos, setPagamentos] = useState(['Cartão de Crédito', 'Pix'])
  const [corridasAnteriores, setCorridasAnteriores] = useState([
    { origem: 'Rua das Flores - Centro', destino: 'Rua B - Maiobão', data: '2025-04-01', valor: 'R$ 20,00' },
    { origem: 'Rua Primavera - Santa Clara', destino: 'Rua Outono - Vila Nova', data: '2025-04-10', valor: 'R$ 25,00' },
  ])
  const [corridasAgendadas, setCorridasAgendadas] = useState([
    { id: 1, origem: 'Rua Pinhos - Centro', destino: 'Rua Olivia - Centro', data: '2025-04-20 14:00' },
  ])

  useEffect(() => {
    const corridaSelected = searchParams.get('corridaSelected')
    if (corridaSelected) {
      const storedCorrida = localStorage.getItem('selectedCorrida')
      if (storedCorrida) {
        setSelectedCorrida(JSON.parse(storedCorrida))
        localStorage.removeItem('selectedCorrida')
      }
    }
  }, [searchParams])

  const salvarEdicao = () => {
    setModoEdicao(false)
    alert('Perfil atualizado com sucesso!')
  }

  const cancelarCorrida = (id: number) => {
    setCorridasAgendadas(corridasAgendadas.filter(corrida => corrida.id !== id))
  }

  const confirmarCorrida = () => {
    if (selectedCorrida) {
      const newCorrida = {
        id: Date.now(),
        origem: selectedCorrida.origem,
        destino: selectedCorrida.destino,
        data: new Date().toLocaleString()
      }
      setCorridasAgendadas([...corridasAgendadas, newCorrida])
      setSelectedCorrida(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center space-y-10 bg-[#DAF3D7] p-4">
      
      {/* Modal de Confirmação */}
      {selectedCorrida && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold text-[#004d2b] mb-4">Confirmar Corrida</h2>
            <p><strong>Origem:</strong> {selectedCorrida.origem}</p>
            <p><strong>Destino:</strong> {selectedCorrida.destino}</p>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setSelectedCorrida(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
              <Link
                href="/pagamento"
                className="bg-yellow-300 hover:bg-yellow-400 text-[#004d2b] font-bold py-2 px-4 rounded flex items-center"
                onClick={confirmarCorrida}
              >
                <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                Selecionar Pagamento
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cabeçalho */}
      <div className="bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[55%] rounded-2xl flex flex-col md:flex-row items-center justify-between p-4 mt-10 gap-4">
        <div className="flex items-center flex-col md:flex-row">
          <img
            src="https://img.freepik.com/fotos-gratis/close-up-na-jovem-empresaria_23-2149153830.jpg?semt=ais_hybrid&w=740"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover mr-0 md:mr-4"
            alt="Foto do Usuário"
          />
          <div className="flex flex-col text-center md:text-left text-[#004d2b] mt-2 md:mt-0">
            <h1 className="text-2xl sm:text-3xl font-bold">{nome}</h1>
            <h2 className="text-lg sm:text-xl text-black">Usuário</h2>
          </div>
        </div>
        <Link
          href="/corridas"
          className="bg-yellow-300 text-[#004d2b] px-6 py-3 rounded-2xl font-bold hover:bg-yellow-400 flex items-center"
        >
          <FontAwesomeIcon icon={faCarAlt} className="mr-2" />
          Pedir Corrida
        </Link>
      </div>

      {/* Informações da Conta */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[55%] space-y-4">
        <h1 className="text-2xl sm:text-3xl border-2 p-3 text-[#004d2b] font-bold text-center rounded-2xl">Informações da Conta</h1>

        {modoEdicao ? (
          <>
            {/* Campos de edição */}
            {[{ label: 'Nome', value: nome, setValue: setNome, icon: faUser },
              { label: 'Telefone', value: telefone, setValue: setTelefone, icon: faPhone },
              { label: 'E-mail', value: email, setValue: setEmail, icon: faEnvelope },
              { label: 'CPF', value: cpf, setValue: setCpf, icon: faIdBadge },
              { label: 'Endereço', value: endereco, setValue: setEndereco, icon: faMapMarkerAlt },
            ].map(({ label, value, setValue, icon }, idx) => (
              <div key={idx}>
                <label className="block text-gray-600 text-sm">
                  <FontAwesomeIcon icon={icon} className="mr-2 text-green-800" /> {label}:
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="border w-full p-2 rounded"
                />
              </div>
            ))}
            <button onClick={salvarEdicao} className="bg-green-800 hover:bg-green-900 text-white font-bold w-full p-2 mt-4">
              Salvar
            </button>
          </>
        ) : (
          <>
            {[{ label: nome, icon: faUser },
              { label: telefone, icon: faPhone },
              { label: email, icon: faEnvelope },
              { label: cpf, icon: faIdBadge },
              { label: endereco, icon: faMapMarkerAlt },
            ].map(({ label, icon }, idx) => (
              <p key={idx}><FontAwesomeIcon icon={icon} className="mr-2 text-green-800" /> {label}</p>
            ))}
            <div className="flex justify-center mt-6">
              <button onClick={() => setModoEdicao(true)} className="bg-yellow-300 text-[#004d2b] px-6 py-3 rounded-2xl font-bold hover:bg-yellow-400">
                Editar Perfil
              </button>
            </div>
          </>
        )}
      </div>

      {/* Corridas Anteriores */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[55%]">
        <h1 className="text-xl text-green-800 font-bold border-2 p-3 mb-5 rounded-2xl">
          <FontAwesomeIcon icon={faRoute} className="mr-2" /> Corridas Anteriores
        </h1>
        {corridasAnteriores.length > 0 ? (
          corridasAnteriores.map((c, index) => (
            <div key={index} className="border rounded p-2 mb-2">
              <p><strong>Origem:</strong> {c.origem}</p>
              <p><strong>Destino:</strong> {c.destino}</p>
              <p><FontAwesomeIcon icon={faClock} className="mr-1" />{c.data} - <FontAwesomeIcon icon={faMoneyBill} className="ml-2 mr-1" />{c.valor}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma corrida anterior registrada</p>
        )}
      </div>

      {/* Corridas Agendadas */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[55%]">
        <h1 className="text-xl text-green-800 font-bold border-2 p-3 mb-5 rounded-2xl">
          <FontAwesomeIcon icon={faClock} className="mr-2" /> Corridas Agendadas
        </h1>
        {corridasAgendadas.length > 0 ? (
          corridasAgendadas.map(c => (
            <div key={c.id} className="border rounded p-2 mb-2 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-2 md:mb-0">
                <p><strong>Origem:</strong> {c.origem}</p>
                <p><strong>Destino:</strong> {c.destino}</p>
                <p><strong>Data:</strong> {c.data}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:underline"><FontAwesomeIcon icon={faEdit} /> Alterar</button>
                <button onClick={() => cancelarCorrida(c.id)} className="text-red-600 hover:underline"><FontAwesomeIcon icon={faTimes} /> Cancelar</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma corrida agendada</p>
        )}
      </div>

      {/* Contato */}
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[55%] mb-10 flex justify-center">
        <Link
          href="/contato"
          className="bg-yellow-300 text-[#004d2b] w-full sm:w-2/3 md:w-1/2 p-3 rounded-2xl font-bold hover:bg-yellow-400 flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
          Entrar em Contato com o Motorista
        </Link>
      </div>
    </div>
  )
}
