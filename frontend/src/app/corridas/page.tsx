"use client"


import { MapPin, Users, ArrowRight, Clock, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { useState } from "react";

export default function CorridasPage() {
  const router = useRouter();
  // Simule o destino esperado pelo usuário (poderia vir de um formulário, contexto, etc)
  const [destinoEsperado] = useState("UFMA");

  const corridas = [
    {
      id: 1,
      origem: "Terminal Cohama",
      destino: "UFMA",
      assentos: 3,
      preco: "R$ 8,50",
      motorista: "Carlos Silva",
      avaliacao: 4.8,
      tempoEstimado: "15 min",
      veiculo: "HB20 Prata - ABC1D23"
    },
    {
      id: 2,
      origem: "Monte Castelo",
      destino: "Shopping da Ilha",
      assentos: 2,
      preco: "R$ 12,00",
      motorista: "Ana Santos",
      avaliacao: 4.9,
      tempoEstimado: "20 min",
      veiculo: "Onix Preto - XYZ4E56"
    },
    {
      id: 3,
      origem: "Renascença",
      destino: "Calhau",
      assentos: 1,
      preco: "R$ 15,00",
      motorista: "João Oliveira",
      avaliacao: 4.7,
      tempoEstimado: "25 min",
      veiculo: "Gol Branco - DEF7G89"
    }
  ];

  const handleSelectCorrida = (corrida: any) => {
    // Validação: se o destino da corrida for diferente do esperado, reporta ao Sentry
    if (corrida.destino !== destinoEsperado) {
      const error = new Error(
        `Destino selecionado (${corrida.destino}) é diferente do destino esperado (${destinoEsperado})`
      );
      Sentry.captureException(error, {
        extra: {
          corridaSelecionada: corrida,
          destinoEsperado,
        },
      });
    }
    localStorage.setItem('selectedCorrida', JSON.stringify(corrida));
    router.push('/usuario?corridaSelected=true');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 flex flex-col items-center gap-8 p-6">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-green-900 mb-2">Corridas Disponíveis</h1>
        <p className="text-green-700">Escolha a melhor opção para sua viagem</p>
      </div>

      <div className="w-full max-w-2xl space-y-6">
        {corridas.map((corrida) => (
          <div
            key={corrida.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Cabeçalho com informações do motorista */}
            <div className="bg-gradient-to-r from-green-800 to-green-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                  <span className="font-bold text-sm">
                    {corrida.motorista.split(' ')[0].charAt(0)}{corrida.motorista.split(' ')[1].charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{corrida.motorista}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                    <span>{corrida.avaliacao}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{corrida.preco}</p>
                <p className="text-sm opacity-90">preço final</p>
              </div>
            </div>

            {/* Rota */}
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center pt-1">
                  <div className="w-3 h-3 rounded-full bg-green-600 mb-1"></div>
                  <div className="w-0.5 h-8 bg-green-300"></div>
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                </div>
                
                <div className="flex-1">
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Partindo de</p>
                    <p className="font-semibold text-green-900">{corrida.origem}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Destino</p>
                    <p className="font-semibold text-green-900">{corrida.destino}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{corrida.tempoEstimado}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{corrida.assentos} assento(s)</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleSelectCorrida(corrida)}
                  className="px-6 py-2 bg-green-700 hover:bg-green-800 text-white rounded-full font-medium transition-colors flex items-center gap-2"
                >
                  Selecionar
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Informações do veículo */}
            <div className="bg-green-50 px-5 py-3 border-t border-green-100">
              <p className="text-sm text-green-800 text-center">{corrida.veiculo}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé informativo */}
      <div className="w-full max-w-2xl mt-4 p-4 bg-white rounded-lg border border-green-200">
        <div className="flex items-center justify-center gap-6 text-sm text-green-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span>Ponto de partida</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Destino</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            <span>Avaliação do motorista</span>
          </div>
        </div>
      </div>
    </main>
  );
}