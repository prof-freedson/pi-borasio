// app/oferecer-carona/page.tsx
"use client"

import { Suspense } from 'react'
import OferecerCaronaContent from '../components/OferecerCaronaContent'

export default function OferecerCaronaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Loading */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-green-200 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-8 bg-green-200 rounded-lg animate-pulse mb-2 w-3/4"></div>
              <div className="h-4 bg-green-200 rounded-lg animate-pulse w-1/2"></div>
            </div>
          </div>

          {/* Main Content Loading */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="text-center mb-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-green-900 mb-2">Carregando formulário...</h2>
              <p className="text-green-700">Preparando tudo para você oferecer sua carona</p>
            </div>
            
            {/* Progress Steps Skeleton */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className="w-10 h-10 bg-green-200 rounded-full animate-pulse"></div>
                  {step < 3 && <div className="w-20 h-1 bg-green-200 mx-2 animate-pulse"></div>}
                </div>
              ))}
            </div>

            {/* Form Fields Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <div className="h-4 bg-green-200 rounded-lg animate-pulse mb-2 w-1/4"></div>
                  <div className="h-12 bg-green-200 rounded-xl animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <OferecerCaronaContent />
    </Suspense>
  )
}