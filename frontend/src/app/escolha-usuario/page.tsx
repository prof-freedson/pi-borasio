import { Suspense } from 'react'
import EscolhaUsuarioForm from '@/app/components/EscolhaUsusarioForm'

export default function EscolhaUsuarioPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-green-100">
          <div className="text-lg">Carregando...</div>
        </div>
      }
    >
      <EscolhaUsuarioForm />
    </Suspense>
  )
}