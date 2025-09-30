import React from 'react';

export default function Estatisticas() {
  return (
    <main className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold text-green-900 mb-4">Estatísticas e Gráficos</h1>
      <p className="text-green-700 mb-6">Visualize dados de corridas por dia, receita, horários de pico, etc.</p>
      {/* Implementar gráficos com bibliotecas como chart.js ou recharts */}
      <div className="border-t pt-6 text-gray-500 text-sm">Em breve: gráficos interativos</div>
    </main>
  );
}
