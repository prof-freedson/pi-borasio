'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ChevronLeft, 
  MapPin, 
  Clock, 
  Users, 
  Heart, 
  ArrowRight,
  Phone,
  Mail,
  Map,
  CheckCircle,
  Navigation,
  Bus,
  Lock
} from 'lucide-react';

const locations = {
  terminais: {
    cohab: { lat: -2.5421, lng: -44.2730, name: "Terminal Cohab" },
    praiaGrande: { lat: -2.5295, lng: -44.2976, name: "Terminal Praia Grande" },
    cohama: { lat: -2.5189, lng: -44.2710, name: "Terminal Cohama" }
  },
  zonaRural: {
    tirirical: { lat: -2.5600, lng: -44.2200, name: "Tirirical" },
    vilaAriri: { lat: -2.5800, lng: -44.2400, name: "Vila Ariri" },
    anjoGuarda: { lat: -2.5200, lng: -44.2000, name: "Anjo da Guarda" },
    maracana: { lat: -2.5400, lng: -44.1800, name: "Maracanã" },
    sacavem: { lat: -2.5000, lng: -44.2900, name: "Sacavém" }
  }
};

export default function ConexaoRuralTerminal() {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [routeReserved, setRouteReserved] = useState<number | null>(null);

  const features = [
    {
      icon: <MapPin className="w-10 h-10" />,
      title: "Rotas Estratégicas",
      description: "Trajetos otimizados que conectam a zona rural aos terminais urbanos, evitando congestionamentos."
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Acessibilidade Garantida",
      description: "Veículos adaptados e motoristas treinados para atender passageiros com mobilidade reduzida."
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Espaço para Bagagens",
      description: "Amplo espaço para transportar produtos agrícolas, compras e outros itens essenciais."
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      title: "Preços Acessíveis",
      description: "Tarifas especiais para moradores da zona rural, com opções de crédito pré-pago e PIX."
    }
  ];

  const routes = [
    { 
      id: 1, 
      origin: "Tirirical", 
      destination: "Terminal Cohab", 
      time: "45 min", 
      price: "R$ 12,00",
      fromCoords: locations.zonaRural.tirirical,
      toCoords: locations.terminais.cohab
    },
    { 
      id: 2, 
      origin: "Vila Ariri", 
      destination: "Terminal Praia Grande", 
      time: "35 min", 
      price: "R$ 10,00",
      fromCoords: locations.zonaRural.vilaAriri,
      toCoords: locations.terminais.praiaGrande
    },
    { 
      id: 3, 
      origin: "Anjo da Guarda", 
      destination: "Terminal Cohama", 
      time: "40 min", 
      price: "R$ 11,00",
      fromCoords: locations.zonaRural.anjoGuarda,
      toCoords: locations.terminais.cohama
    },
    { 
      id: 4, 
      origin: "Maracanã", 
      destination: "Terminal Cohab", 
      time: "50 min", 
      price: "R$ 13,00",
      fromCoords: locations.zonaRural.maracana,
      toCoords: locations.terminais.cohab
    },
    { 
      id: 5, 
      origin: "Sacavém", 
      destination: "Terminal Praia Grande", 
      time: "30 min", 
      price: "R$ 9,00",
      fromCoords: locations.zonaRural.sacavem,
      toCoords: locations.terminais.praiaGrande
    }
  ];

  const steps = [
    { number: 1, title: "Baixe o App", description: "Instale o Bora Siô na sua loja de aplicativos" },
    { number: 2, title: "Selecione a Rota", description: "Escolha a opção 'Conexão Rural-Terminal' no menu" },
    { number: 3, title: "Agende sua Viagem", description: "Informe origem, destino, data e horário" },
    { number: 4, title: "Confirme", description: "Escolha a forma de pagamento e confirme sua viagem" }
  ];

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    const route = routes.find(r => r.origin === cityName);
    if (route) {
      setSelectedRoute(route.id);
    }
  };

  const handleReserveRoute = (routeId: number) => {
    setRouteReserved(routeId);
  };

  const handleGoToRides = () => {
    if (routeReserved) {
      const route = routes.find(r => r.id === routeReserved);
      if (route) {
        localStorage.setItem('selectedRuralRoute', JSON.stringify(route));
        window.location.href = '/corridas?tipo=rural';
      }
    }
  };

  // Componente do Mapa Simplificado - SEMPRE VISÍVEL
  const SimpleMap = () => {
    const selectedRouteData = routes.find(r => r.id === selectedRoute);
    
    return (
      <div className="w-full h-full bg-green-50 rounded-lg border-2 border-green-200 relative overflow-hidden">
        {/* Fundo do mapa estilizado */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-yellow-50 opacity-60"></div>
        
        {/* Grade de fundo simulando um mapa */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute w-full h-px bg-green-300" style={{ top: `${i * 10}%` }}></div>
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute h-full w-px bg-green-300" style={{ left: `${i * 10}%` }}></div>
          ))}
        </div>

        {/* Terminais - posicionados à direita */}
        <div className="absolute right-4 top-4">
          <div className="flex flex-col gap-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
              <h4 className="font-bold text-red-600 text-sm mb-2">TERMINAIS</h4>
              {Object.values(locations.terminais).map((terminal, index) => (
                <div key={terminal.name} className="flex items-center gap-2 mb-1">
                  <div className={`w-3 h-3 bg-red-500 rounded-full ${selectedRouteData?.toCoords.name === terminal.name ? 'ring-2 ring-red-300 animate-pulse' : ''}`}></div>
                  <span className="text-xs font-medium">{terminal.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Zona Rural - posicionados à esquerda */}
        <div className="absolute left-4 top-4">
          <div className="flex flex-col gap-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
              <h4 className="font-bold text-green-700 text-sm mb-2">ZONA RURAL</h4>
              {Object.values(locations.zonaRural).map((rural, index) => (
                <div key={rural.name} className="flex items-center gap-2 mb-1">
                  <div className={`w-3 h-3 bg-green-600 rounded-full ${selectedRouteData?.fromCoords.name === rural.name ? 'ring-2 ring-green-300 animate-pulse' : ''}`}></div>
                  <span className="text-xs font-medium">{rural.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Todas as rotas disponíveis - linhas cinzas */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-4/5 h-4/5">
            {/* Linhas de todas as rotas (mais claras) */}
            {routes.map((route, index) => {
              const fromX = 20 + (index * 15);
              const toX = 80 - (index * 15);
              return (
                <div 
                  key={route.id}
                  className={`absolute h-1 rounded-full transition-all duration-300 ${
                    selectedRoute === route.id 
                      ? 'bg-[#004d2b] z-10 animate-pulse' 
                      : 'bg-gray-300 opacity-50'
                  }`}
                  style={{
                    top: `${30 + (index * 10)}%`,
                    left: `${fromX}%`,
                    width: `${toX - fromX}%`,
                    transform: 'rotate(0deg)'
                  }}
                ></div>
              );
            })}

            {/* Pontos de origem (verde) */}
            {routes.map((route, index) => (
              <div 
                key={`from-${route.id}`}
                className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedRoute === route.id 
                    ? 'bg-green-600 ring-2 ring-green-300 z-20 animate-pulse' 
                    : 'bg-green-400'
                }`}
                style={{
                  top: `${30 + (index * 10)}%`,
                  left: `${20 + (index * 15)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              ></div>
            ))}

            {/* Pontos de destino (vermelho) */}
            {routes.map((route, index) => (
              <div 
                key={`to-${route.id}`}
                className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedRoute === route.id 
                    ? 'bg-red-500 ring-2 ring-red-300 z-20 animate-pulse' 
                    : 'bg-red-400'
                }`}
                style={{
                  top: `${30 + (index * 10)}%`,
                  left: `${80 - (index * 15)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Informações da rota selecionada ou instruções */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-green-200">
          {selectedRouteData ? (
            <>
              <h4 className="font-bold text-[#004d2b] text-center">
                {selectedRouteData.origin} → {selectedRouteData.destination}
              </h4>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedRouteData.time}
                </span>
                <span className="flex items-center gap-1">
                  💰 {selectedRouteData.price}
                </span>
              </div>
              {routeReserved === selectedRouteData.id && (
                <div className="mt-2 text-center">
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    <CheckCircle className="w-3 h-3" />
                    Rota Reservada
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-600">
              <p className="font-semibold">💡 Como usar o mapa:</p>
              <p className="text-sm mt-1">Clique em uma rota à esquerda para visualizar os detalhes</p>
              <p className="text-xs mt-1 text-gray-500">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-1"></span>
                Zona Rural • 
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mx-1"></span>
                Terminais
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Head>
        <title>Conexão Rural-Terminal - Bora Siô</title>
        <meta name="description" content="Ligando o campo à cidade com rotas acessíveis e seguras para os terminais de São Luís" />
      </Head>

      {/* Header */}
      <header className="bg-[#004d2b] text-white py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#004d2b]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">Bora Siô</h1>
          </div>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#004d2b] to-[#006d3b] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Conexão Rural-Terminal</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Ligando o campo à cidade com rotas acessíveis e seguras para os terminais de São Luís
          </p>
          
          {/* Botões rápidos para cidades da zona rural */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.entries(locations.zonaRural).map(([key, city]) => (
              <button
                key={key}
                onClick={() => handleCitySelect(city.name)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCity === city.name 
                    ? 'bg-yellow-400 text-[#004d2b] shadow-lg' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>

          <Link 
            href="#rotas" 
            className="inline-flex items-center bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
          >
            Ver Rotas Disponíveis
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#004d2b] mb-12">Como Funciona a Conexão</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-[#004d2b] mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#004d2b] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Routes Section */}
      <section id="rotas" className="py-16 px-4 sm:px-6 lg:px-8 bg-green-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#004d2b] mb-12">Rotas e Terminais</h2>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/5 bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-[#004d2b] mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Principais Conexões
              </h3>
              
              <div className="space-y-4">
                {routes.map(route => (
                  <div 
                    key={route.id} 
                    className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                      selectedRoute === route.id 
                        ? 'bg-green-50 border-[#004d2b] shadow-md' 
                        : 'bg-gray-50 border-transparent hover:bg-green-50'
                    } ${routeReserved === route.id ? 'border-green-500 bg-green-50' : ''}`}
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-[#004d2b]">{route.origin}</h4>
                        <p className="text-sm text-gray-600">para {route.destination}</p>
                      </div>
                      <span className="font-bold text-[#004d2b] text-lg">{route.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{route.time}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReserveRoute(route.id);
                        }}
                        disabled={routeReserved === route.id}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                          routeReserved === route.id
                            ? 'bg-green-500 text-white cursor-not-allowed'
                            : 'bg-[#004d2b] text-white hover:bg-[#006d3b]'
                        }`}
                      >
                        {routeReserved === route.id ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Selecionado
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3" />
                            Selecionar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botões de ação */}
              <div className="mt-6 flex gap-3">
                <button 
                  onClick={handleGoToRides}
                  disabled={!routeReserved}
                  className={`flex-1 py-3 px-4 rounded-lg transition-colors text-center flex items-center justify-center gap-2 font-semibold ${
                    routeReserved
                      ? 'bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] shadow-md'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Bus className="w-5 h-5" />
                  {routeReserved ? 'Confirmar seleção' : 'Selecione uma rota'}
                </button>
              </div>
            </div>
            
            <div className="lg:w-3/5 bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-[#004d2b] mb-4 flex items-center gap-2">
                <Map className="w-5 h-5" />
                Mapa das Rotas
              </h3>
              
              <div className="h-96 rounded-lg overflow-hidden">
                <SimpleMap />
              </div>

              {/* Legenda do mapa */}
              <div className="flex justify-center gap-6 mt-4 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span>Zona Rural</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Terminais</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-1 bg-[#004d2b] rounded-full"></div>
                  <span>Rota Selecionada</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-1 bg-gray-300 rounded-full"></div>
                  <span>Rotas Disponíveis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resto do código mantido */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#004d2b] mb-12">Como Agendar sua Viagem</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(step => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 mx-auto bg-[#004d2b] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-[#004d2b] mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="agendar" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#004d2b] to-[#006d3b] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para uma viagem mais acessível?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Junte-se a centenas de moradores da zona rural que já utilizam o Bora Siô para chegar aos terminais de São Luís com conforto e segurança.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/corridas?tipo=rural" 
              className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
            >
              Ver Todas as Rotas
            </Link>
            <Link 
              href="/contato" 
              className="inline-flex items-center justify-center border border-white text-white hover:bg-white hover:text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Falar com Atendente
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}