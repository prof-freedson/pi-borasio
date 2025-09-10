"use client"

import { faCreditCard, faBarcode, faQrcode, faTicketAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function Pagamento() {
  const router = useRouter()
  const [metodoPagamento, setMetodoPagamento] = useState('credito')
  const [descontoAplicado, setDescontoAplicado] = useState(false)
  const [pagamentoFinalizado, setPagamentoFinalizado] = useState(false)
  const [valorOriginal] = useState(55.00)
  const [valorComDesconto] = useState(37.00)
  const [valorExibido, setValorExibido] = useState(valorOriginal)

  const handleFinalizarPagamento = () => {
    // Reduz o valor à metade
    const novoValor = descontoAplicado ? valorComDesconto / 2 : valorOriginal / 2
    setValorExibido(novoValor)
    setPagamentoFinalizado(true)
    
    // Opcional: resetar após alguns segundos
    setTimeout(() => {
      router.push('/usuario')
    }, 3000)
  }
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Pagamento</h1>
          
          {/* Mensagem de pagamento finalizado */}
          {pagamentoFinalizado && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500 text-xl" />
              <div>
                <p className="font-bold">Pagamento finalizado com sucesso!</p>
                <p className="text-sm">Valor pago: R$ {valorExibido.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
          )}
          
          {/* Seção de Cartão */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-yellow-500" />
              Cartão de Crédito
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número do cartão</label>
                <input 
                  type="text" 
                  placeholder="1234 5678 9012 3456" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de validade</label>
                  <input 
                    type="text" 
                    placeholder="MM/AA" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input 
                    type="text" 
                    placeholder="123" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Métodos de Pagamento */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Método de pagamento</h2>
            
            <div className="space-y-3">
              <div 
                className={`flex items-center p-3 border rounded-md cursor-pointer ${metodoPagamento === 'credito' ? 'border-yellow-500 bg-blue-50' : 'border-gray-300'}`}
                onClick={() => setMetodoPagamento('credito')}
              >
                <input 
                  type="radio" 
                  checked={metodoPagamento === 'credito'}
                  onChange={() => {}}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                />
                <label className="ml-2 block text-sm font-medium text-gray-700">
                  Cartão de crédito
                </label>
              </div>
              
              <div 
                className={`flex items-center p-3 border rounded-md cursor-pointer ${metodoPagamento === 'boleto' ? 'border-yellow-500 bg-blue-50' : 'border-gray-300'}`}
                onClick={() => setMetodoPagamento('boleto')}
              >
                <input 
                  type="radio" 
                  checked={metodoPagamento === 'boleto'}
                  onChange={() => {}}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                />
                <label className="ml-2 block text-sm font-medium text-gray-700 flex items-center">
                  <FontAwesomeIcon icon={faBarcode} className="mr-2" />
                  Boleto
                  <span className="mx-2">/</span>
                  <FontAwesomeIcon icon={faQrcode} className="mr-2" />
                  Pix
                </label>
              </div>
            </div>
          </div>
          
          {/* Cupom de Desconto */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <FontAwesomeIcon icon={faTicketAlt} className="mr-2 text-green-500" />
              Voucher de desconto
            </h2>
            
            <div className="flex">
              <input 
                type="text" 
                placeholder="Código do voucher" 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-md"
                onClick={() => setDescontoAplicado(true)}
              >
                Aplicar
              </button>
            </div>
          </div>
          
          {/* Resumo e Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">R$ {valorOriginal.toFixed(2).replace('.', ',')}</span>
            </div>
            
            {descontoAplicado && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Desconto:</span>
                <span>- R$ {(valorOriginal - valorComDesconto).toFixed(2).replace('.', ',')}</span>
              </div>
            )}
            
            <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
              <span>Total:</span>
              <span className="text-yellow-600">
                R$ {pagamentoFinalizado ? valorExibido.toFixed(2).replace('.', ',') : 
                    (descontoAplicado ? valorComDesconto.toFixed(2).replace('.', ',') : valorOriginal.toFixed(2).replace('.', ','))}
              </span>
            </div>
          </div>
          
          {/* Botão Finalizar */}
          <button 
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-md mt-6 transition duration-200"
            onClick={handleFinalizarPagamento}
            disabled={pagamentoFinalizado}
          >
            {pagamentoFinalizado ? 'Pagamento Concluído' : 'Finalizar pagamento'}
          </button>
        </div>
      </div>
    </div>
  )
}