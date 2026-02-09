import { Suspense } from 'react'
import PagamentoContent from '../components/PagamentoContent'

export default function PagamentoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fcfdfc] flex items-center justify-center p-6">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando página de pagamento...</p>
          </div>
        </div>
      </div>
    }>
      <PagamentoContent />
    </Suspense>
  )
}
