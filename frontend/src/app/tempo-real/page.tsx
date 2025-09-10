'use client';

import { ChevronLeft, MapPin, Clock, AlertTriangle, Car, Construction, Users, Thermometer } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function TempoRealPage() {
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [trafficData, setTrafficData] = useState({
    lastUpdate: 'Há 2 minutos',
    routes: [
      {
        id: 1,
        name: 'Rota Principal',
        from: 'Terminal Cohama',
        to: 'Centro Histórico',
        time: '25 min',
        distance: '8,2 km',
        congestion: 'moderado',
        incidents: ['Obra na pista', 'Trânsito moderado'],
        alternative: true
      },
      {
        id: 2,
        name: 'Rota Alternativa 1',
        from: 'Terminal Cohama',
        to: 'Centro Histórico',
        time: '18 min',
        distance: '9,5 km',
        congestion: 'leve',
        incidents: ['Trânsito leve'],
        alternative: false
      },
      {
        id: 3,
        name: 'Rota Alternativa 2',
        from: 'Terminal Cohama',
        to: 'Centro Histórico',
        time: '22 min',
        distance: '7,8 km',
        congestion: 'intenso',
        incidents: ['Manifestação na via', 'Trânsito parado'],
        alternative: false
      }
    ],
    incidents: [
      {
        type: 'construction',
        location: 'Av. dos Holandeses, km 3.5',
        description: 'Obra de recapeamento - faixa direita interditada',
        severity: 'medium',
        time: 'Desde 08:00'
      },
      {
        type: 'accident',
        location: 'Av. Daniel de La Touche, próximo ao Shopping',
        description: 'Acidente envolvendo 2 veículos - trânsito lento',
        severity: 'high',
        time: 'Há 15 min'
      },
      {
        type: 'event',
        location: 'Centro Histórico',
        description: 'Evento cultural - trânsito desviado nas ruas adjacentes',
        severity: 'low',
        time: 'Até 22:00'
      },
      {
        type: 'congestion',
        location: 'Ponte do São Francisco',
        description: 'Trânsito intenso no sentido Centro-Bairro',
        severity: 'high',
        time: 'Desde 17:30'
      }
    ]
  });

  // Simula atualização dos dados a cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(prev => ({
        ...prev,
        lastUpdate: 'Agora mesmo'
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'leve': return 'bg-green-500';
      case 'moderado': return 'bg-yellow-500';
      case 'intenso': return 'bg-orange-500';
      case 'parado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCongestionText = (level: string) => {
    switch (level) {
      case 'leve': return 'Trânsito leve';
      case 'moderado': return 'Trânsito moderado';
      case 'intenso': return 'Trânsito intenso';
      case 'parado': return 'Trânsito parado';
      default: return 'Condições normais';
    }
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'construction': return <Construction className="w-5 h-5" />;
      case 'accident': return <AlertTriangle className="w-5 h-5" />;
      case 'event': return <Users className="w-5 h-5" />;
      case 'congestion': return <Thermometer className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#004d2b] to-green-700 text-white py-5 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/transito-inteligente" className="flex items-center gap-2 hover:text-green-200 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-center flex-1">
            Monitor de Trânsito
          </h1>
          <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{trafficData.lastUpdate}</span>
          </div>
        </div>
      </header>

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Mapa e Rotas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <MapPin className="text-[#004d2b]" />
                Rotas em Tempo Real
              </h2>
              
              {/* Mapa Simulado */}
              <div className="bg-gray-100 rounded-lg h-64 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="mx-auto bg-white p-4 rounded-lg shadow-md inline-block">
                      <Car className="w-12 h-12 mx-auto text-[#004d2b] mb-2" />
                      <p className="font-semibold">Mapa de tráfego em tempo real</p>
                      <p className="text-sm">Visualização das condições do trânsito</p>
                    </div>
                  </div>
                </div>
                
                {/* Indicadores de tráfego no mapa */}
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Congestionamento
                </div>
                <div className="absolute bottom-4 left-4 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  Obras na via
                </div>
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Trânsito leve
                </div>
              </div>
              
              {/* Legenda */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Leve</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Moderado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm">Intenso</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Parado</span>
                </div>
              </div>
              
              {/* Seleção de Rotas */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 mb-2">Rotas Disponíveis</h3>
                {trafficData.routes.map((route, index) => (
                  <div 
                    key={route.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedRoute === index 
                        ? 'border-[#004d2b] bg-green-50 shadow-md' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => setSelectedRoute(index)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">{route.name}</h4>
                        <p className="text-sm text-gray-600">{route.from} → {route.to}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-800">{route.time}</span>
                        <div className={`w-3 h-3 rounded-full ${getCongestionColor(route.congestion)}`}></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">{route.distance}</span>
                      <span className={route.congestion === 'leve' ? 'text-green-600' : 'text-yellow-600'}>
                        {getCongestionText(route.congestion)}
                      </span>
                    </div>
                    
                    {route.incidents.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-amber-600">
                          <AlertTriangle className="w-4 h-4" />
                          <span>{route.incidents.join(' • ')}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Incidentes e Alertas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <AlertTriangle className="text-amber-600" />
                Alertas de Trânsito
              </h2>
              
              <div className="space-y-4">
                {trafficData.incidents.map((incident, index) => (
                  <div key={index} className="border-l-4 border-amber-500 pl-4 py-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-amber-600">
                        {getIncidentIcon(incident.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-gray-800">{incident.location}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(incident.severity)}`}>
                            {incident.severity === 'high' ? 'Alta' : incident.severity === 'medium' ? 'Média' : 'Baixa'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">{incident.time}</span>
                          <button className="text-xs text-[#004d2b] hover:text-green-800">
                            Ver detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Estatísticas Rápidas */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-4">Estatísticas do Trânsito</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-700">12</p>
                    <p className="text-xs text-green-600">Incidentes ativos</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-700">78%</p>
                    <p className="text-xs text-green-600">Vias fluidas</p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-amber-700">22 min</p>
                    <p className="text-xs text-amber-600">Tempo médio</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-red-700">3</p>
                    <p className="text-xs text-red-600">Vias críticas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dicas de Trânsito */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dicas para o Seu Trajeto</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-l-4 border-[#004d2b] pl-4 py-2">
                <h4 className="font-semibold text-gray-800">Melhor Horário</h4>
                <p className="text-sm text-gray-600">Evite as vias entre 7h-9h e 17h-19h</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h4 className="font-semibold text-gray-800">Rotas Alternativas</h4>
                <p className="text-sm text-gray-600">Use a Av. Ferreira Gullar para evitar a Holandeses</p>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <h4 className="font-semibold text-gray-800">Previsão</h4>
                <p className="text-sm text-gray-600">O trânsito deve normalizar em 45 minutos</p>
              </div>
            </div>
          </div>
          
          {/* Atualização de Dados */}
          <div className="text-center">
            <button className="bg-[#004d2b] hover:bg-green-800 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2 mx-auto">
              <Clock className="w-5 h-5" />
              Atualizar Dados de Trânsito
            </button>
            <p className="text-sm text-gray-500 mt-2">Atualizado {trafficData.lastUpdate}</p>
          </div>
        </div>
      </main>
    </div>
  );
}