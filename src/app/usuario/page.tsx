"use client"

import { faClock, faCommentDots, faCreditCard, faEdit, faEnvelope, faIdBadge, faMapMarkerAlt, faMoneyBill, faPhone, faRoute, faTimes, faUser, faCarAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
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
    // Check if we're coming from corridas selection
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
      // Add to scheduled corridas
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
      {/* Selected Corrida Modal */}
      {selectedCorrida && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[80%] max-w-md shadow-xl">
            <h2 className="text-2xl font-bold text-[#004d2b] mb-4">Confirmar Corrida</h2>
            <div className="mb-4">
              <p><strong>Origem:</strong> {selectedCorrida.origem}</p>
              <p><strong>Destino:</strong> {selectedCorrida.destino}</p>
            </div>
            <div className="flex justify-between">
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

      {/* Perfil */}
      <div className="bg-white w-[55%] mb-1 items-center rounded-2xl flex mt-10 p-4 justify-between">
        <div className="flex items-center">
          <img
            src="https://img.freepik.com/fotos-gratis/close-up-na-jovem-empresaria_23-2149153830.jpg?semt=ais_hybrid&w=740"
            className="w-32 h-32 rounded-full object-cover mr-4"
            alt="Foto do Usuario"
          />
          <div className="flex flex-col text-[#004d2b]">
            <h1 className="text-4xl font-bold">{nome}</h1>
            <h2 className="text-2xl text-black">Usuário</h2>
          </div>
        </div>
        <Link 
          href="/corridas" 
          className="bg-yellow-300 text-[#004d2b] px-6 py-3 rounded-2xl font-bold hover:bg-yellow-400 flex items-center h-fit"
        >
          <FontAwesomeIcon icon={faCarAlt} className="mr-2" />
          Pedir Corrida
        </Link>
      </div>

      {/* Informações da Conta */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[55%] space-y-4">
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

            {/* CPF */}
            <div>
              <label className="block text-gray-600 text-sm">
                <FontAwesomeIcon icon={faIdBadge} className="mr-2 text-green-800" /> CPF:
              </label>
              <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} className="border w-full p-2 rounded" />
            </div>

            {/* Endereço */}
            <div>
              <label className="block text-gray-600 text-sm">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-green-800" /> Endereço:
              </label>
              <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="border w-full p-2 rounded" />
            </div>
            
            <button onClick={salvarEdicao} className="bg-green-800 hover:bg-green-900 text-white font-bold w-full p-2 mt-4">Salvar</button>
          </>
        ) : (
          <>
            <p><FontAwesomeIcon icon={faUser} className="mr-2 text-green-800" /> {nome}</p>
            <p><FontAwesomeIcon icon={faPhone} className="mr-2 text-green-800" /> {telefone}</p>
            <p><FontAwesomeIcon icon={faEnvelope} className="mr-2 text-green-800" /> {email}</p>
            <p><FontAwesomeIcon icon={faIdBadge} className="mr-2 text-green-800" /> {cpf}</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-green-800" /> {endereco}</p>
                        

            <div className="w-[60%] mb-10 mx-auto flex justify-center">
              <button onClick={() => setModoEdicao(true)}
              className="bg-yellow-300 text-[#004d2b] w-1/2 p-3 rounded-2xl font-bold hover:bg-yellow-400">
                Editar Perfil
              </button>
            </div>
          </>
        )}
      </div>

      {/* Corridas Anteriores */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[55%]">
        <h1 className="text-xl text-green-800 font-bold border-2 p-3 mb-5 rounded-2xl">
          <FontAwesomeIcon icon={faRoute} className="mr-2" />Corridas Anteriores
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
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[55%]">
        <h1 className="text-xl text-green-800 font-bold border-2 p-3 mb-5 rounded-2xl">
          <FontAwesomeIcon icon={faClock} className="mr-2" />Corridas Agendadas
        </h1>
        {corridasAgendadas.length > 0 ? (
          corridasAgendadas.map(c => (
            <div key={c.id} className="border rounded p-2 mb-2 flex justify-between items-center">
              <div>
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

      {/* Contato com Motorista */}
      <div className="w-[60%] mb-10 flex justify-center">
  <Link 
    href="/contato" 
    className="bg-yellow-300 text-[#004d2b] w-1/2 p-3 rounded-2xl font-bold hover:bg-yellow-400 flex justify-center items-center"
  >
    <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
    Entrar em Contato com o Motorista
  </Link>
</div>
</div>
  )
}
