'use client'

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  ChevronLeft,
  MapPin,
  Clock,
  Users,
  Heart,
  ArrowRight,
  Map,
  CheckCircle,
  Navigation,
  Bus,
  Lock,
  Zap,
  Ticket,
  ShieldCheck,
  Smartphone
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
      icon: <MapPin className="w-8 h-8" />,
      title: "Rotas Estratégicas",
      description: "Trajetos inteligentes ligando o campo aos principais terminais urbanos."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Segurança Total",
      description: "Motoristas verificados e veículos monitorados em tempo real."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Espaço Amplo",
      description: "Conforto para passageiros e lugar para suas bagagens e encomendas."
    },
    {
      icon: <Ticket className="w-8 h-8" />,
      title: "Melhor Preço",
      description: "Tarifas sociais exclusivas para quem move a economia rural."
    }
  ];

  const routes = [
    { id: 1, origin: "Tirirical", destination: "Terminal Cohab", time: "45 min", price: "R$ 12,00" },
    { id: 2, origin: "Vila Ariri", destination: "Terminal Praia Grande", time: "35 min", price: "R$ 10,00" },
    { id: 3, origin: "Anjo da Guarda", destination: "Terminal Cohama", time: "40 min", price: "R$ 11,00" },
    { id: 4, origin: "Maracanã", destination: "Terminal Cohab", time: "50 min", price: "R$ 13,00" },
    { id: 5, origin: "Sacavém", destination: "Terminal Praia Grande", time: "30 min", price: "R$ 9,00" }
  ];

  const steps = [
    { icon: <Smartphone />, title: "Abra o App", description: "Encontre a opção Rural no menu principal" },
    { icon: <Navigation />, title: "Defina a Rota", description: "Escolha de onde você sai e onde quer chegar" },
    { icon: <Clock />, title: "Escolha a Hora", description: "Agende sua viagem com antecedência" },
    { icon: <Bus />, title: "Bora Viar!", description: "Confirme o pagamento e boa viagem" }
  ];

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    const route = routes.find(r => r.origin === cityName);
    if (route) {
      setSelectedRoute(route.id);
    }
  };

  const selectedRouteData = routes.find(r => r.id === selectedRoute);

  return (
    <div className="min-h-screen bg-green-100 font-poppins selection:bg-green-200 selection:text-green-900">
      <Head>
        <title>Conexão Rural-Terminal | Bora Siô</title>
        <meta name="description" content="Conectando a zona rural aos terminais de São Luís com eficiência e economia." />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#004d2b] py-20 lg:py-32">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-gradient-to-br from-green-400 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-tl from-yellow-400 to-transparent rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <Link
              href="/"
              className="group mb-8 flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm transition-all text-white text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Voltar ao Início
            </Link>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-300 text-xs font-bold uppercase tracking-wider mb-4 border border-yellow-400/30">
              <Zap className="w-3 h-3 fill-yellow-400" />
              Mobilidade Regional
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl tracking-tight">
              A Conexão do <span className="text-yellow-400 italic">Campo</span> com a <span className="text-emerald-300 underline underline-offset-8 decoration-white/20">Cidade</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-12 leading-relaxed">
              Ligando a zona rural aos terminais de São Luís com as rotas mais eficientes, seguras e com o preço que você precisa.
            </p>

            <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
              {Object.entries(locations.zonaRural).map(([key, city]) => (
                <button
                  key={key}
                  onClick={() => handleCitySelect(city.name)}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${selectedCity === city.name
                    ? 'bg-yellow-400 text-[#004d2b] shadow-xl shadow-yellow-400/20'
                    : 'bg-white/10 text-white border border-white/10 hover:bg-white/20 backdrop-blur-md'
                    }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="py-20 px-4 relative -mt-10 lg:-mt-16 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-green-50 rounded-3xl flex items-center justify-center text-[#004d2b] mb-6 group-hover:bg-[#004d2b] group-hover:text-white transition-colors duration-500 group-hover:rotate-12">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#004d2b] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route Map Section */}
      <section id="rotas" className="py-12 lg:py-24 px-4 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#004d2b] mb-4">Rotas e Terminais</h2>
            <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-6 max-w-xl mx-auto font-semibold">
              Escolha seu trajeto abaixo para ver detalhes de tempo e tarifas exclusivas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* List side */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-3 mb-6">
                <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#004d2b]">Conexões Ativas</h4>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Selecione uma para ver no mapa</p>
                </div>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {routes.map(route => (
                  <button
                    key={route.id}
                    onClick={() => setSelectedRoute(route.id)}
                    className={`w-full text-left p-6 rounded-[2rem] transition-all duration-500 border-2 relative overflow-hidden group ${selectedRoute === route.id
                      ? 'bg-[#004d2b] border-[#004d2b] shadow-2xl shadow-[#004d2b]/20 translate-x-3'
                      : 'bg-white border-transparent hover:border-green-100 hover:bg-green-50/50'
                      }`}
                  >
                    {/* Active highlight background */}
                    {selectedRoute === route.id && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    )}

                    <div className="flex justify-between items-start relative z-10">
                      <div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 block ${selectedRoute === route.id ? 'text-emerald-300' : 'text-gray-500'}`}>
                          ROTA #{route.id}
                        </span>
                        <h4 className={`text-xl font-bold ${selectedRoute === route.id ? 'text-white' : 'text-[#004d2b]'}`}>
                          {route.origin}
                        </h4>
                        <div className={`flex items-center gap-2 mt-1 ${selectedRoute === route.id ? 'text-white/80' : 'text-gray-600'}`}>
                          <ArrowRight className="w-4 h-4" />
                          <span className="font-bold">{route.destination}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-black ${selectedRoute === route.id ? 'text-yellow-400' : 'text-[#004d2b]'}`}>
                          {route.price}
                        </div>
                        <div className={`flex items-center justify-end gap-1 text-xs mt-1 font-black ${selectedRoute === route.id ? 'text-white/90' : 'text-gray-500'}`}>
                          <Clock className="w-3.5 h-3.5" />
                          {route.time}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  if (selectedRoute) {
                    const route = routes.find(r => r.id === selectedRoute);
                    localStorage.setItem('selectedRuralRoute', JSON.stringify(route));
                    window.location.href = '/corridas?tipo=rural';
                  }
                }}
                disabled={!selectedRoute}
                className={`w-full mt-8 py-5 px-8 rounded-3xl font-black text-lg transition-all flex items-center justify-center gap-3 group shadow-xl ${selectedRoute
                  ? 'bg-[#004d2b] text-white hover:bg-[#003823] shadow-[#004d2b]/20 active:scale-95'
                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                  }`}
              >
                {selectedRoute ? (
                  <>
                    <span>Confirmar Rota Selecionada</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </>
                ) : (
                  <span>Selecione uma Rota acima</span>
                )}
              </button>
            </div>

            {/* Map side */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white p-6 shadow-2xl flex-grow flex flex-col relative overflow-hidden">
                {/* Map header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="bg-yellow-400 p-2 rounded-xl">
                      <Map className="w-5 h-5 text-[#004d2b]" />
                    </div>
                    <span className="font-black text-[#004d2b] uppercase tracking-widest text-xs">Visualização Dinâmica</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                      <span className="text-[10px] font-black text-gray-500 uppercase">Zona Rural</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                      <span className="text-[10px] font-black text-gray-500 uppercase">Terminais</span>
                    </div>
                  </div>
                </div>

                {/* The "Map" visual */}
                <div className="flex-grow rounded-3xl bg-slate-50 border border-gray-100 relative overflow-hidden">
                  {/* Grid effect */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                  {/* Selected route text */}
                  <div className="absolute top-6 left-6 right-6 z-10">
                    <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-white flex items-center justify-between">
                      {selectedRouteData ? (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                              <Bus className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Trajeto Selecionado</p>
                              <h5 className="font-black text-[#004d2b] leading-tight text-sm">
                                {selectedRouteData.origin} → {selectedRouteData.destination}
                              </h5>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="block text-xl font-black text-emerald-600 leading-none">{selectedRouteData.price}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">{selectedRouteData.time}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-3 py-1">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center animate-pulse">
                            <Lock className="w-4 h-4 text-gray-300" />
                          </div>
                          <p className="text-sm font-black text-gray-500">Clique em uma rota ao lado para analisar o trajeto</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Visual routes visualization */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-4/5 h-1/2">
                      {/* Grey placeholder lines */}
                      {routes.map((r, i) => (
                        <div
                          key={`line-${r.id}`}
                          className={`absolute h-0.5 rounded-full transition-all duration-1000 ${selectedRoute === r.id ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20' : 'bg-gray-200/50 z-10'
                            }`}
                          style={{
                            top: `${20 + (i * 15)}%`,
                            left: '10%',
                            right: '10%',
                            transform: `skewX(${selectedRoute === r.id ? '0' : '10'}deg)`
                          }}
                        >
                          {selectedRoute === r.id && (
                            <div className="absolute -top-1.5 left-0 animate-move-bus flex flex-col items-center">
                              <div className="bg-emerald-500 p-1.5 rounded-full shadow-lg border-2 border-white">
                                <Bus className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Origin dots */}
                      {routes.map((r, i) => (
                        <div
                          key={`origin-${r.id}`}
                          className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-500 ${selectedRoute === r.id ? 'bg-emerald-500 scale-150 z-30 ring-4 ring-emerald-500/20' : 'bg-emerald-400 z-10'
                            }`}
                          style={{ top: `${20 + (i * 15)}%`, left: '10%', transform: 'translate(-50%, -50%)' }}
                        ></div>
                      ))}

                      {/* Destination dots */}
                      {routes.map((r, i) => (
                        <div
                          key={`dest-${r.id}`}
                          className={`absolute w-3 h-3 rounded-full border-2 border-white shadow-md transition-all duration-500 ${selectedRoute === r.id ? 'bg-red-400 scale-150 z-30 ring-4 ring-red-400/20' : 'bg-red-300 z-10'
                            }`}
                          style={{ top: `${20 + (i * 15)}%`, right: '10%', transform: 'translate(50%, -50%)' }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Floating helpful hints */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end gap-4">
                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl max-w-[200px]">
                      <p className="text-[10px] text-gray-400 uppercase font-black leading-tight mb-1">Dica Rápida</p>
                      <p className="text-xs text-[#004d2b] font-bold leading-snug">Todas as rotas são integradas via App para garantir sua reserva.</p>
                    </div>
                    <div className="bg-[#004d2b] p-4 rounded-2xl shadow-xl shadow-[#004d2b]/20 flex items-center gap-3">
                      <div className="bg-white/10 p-2 rounded-xl text-yellow-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="text-white">
                        <p className="text-xs font-black leading-none">98%</p>
                        <p className="text-[8px] font-bold uppercase opacity-60">Satisfação</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 px-4 overflow-hidden relative">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[#fcfdfc] shadow-inner -z-10 skew-y-1 transform origin-top-left scale-110"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#004d2b] mb-4">Como Agendar sua Viagem</h2>
            <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group perspective-1000">
                <div className="bg-white p-8 rounded-[3rem] border border-green-100 flex flex-col items-center text-center transition-all duration-500 hover:border-green-200 hover:-rotate-y-3 shadow-2xl shadow-green-900/5">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-[#004d2b] mb-6 shadow-xl group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-extrabold text-[#004d2b] mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-bold">{step.description}</p>

                  {/* Sequence number */}
                  <div className="absolute top-6 right-8 text-5xl font-black text-[#004d2b]/10 italic">
                    0{idx + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#004d2b] to-emerald-800 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Shapes */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"></div>

            <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10">Pronto para uma viagem mais acessível?</h2>
            <p className="text-lg md:text-xl text-emerald-50 mb-10 max-w-2xl mx-auto font-black relative z-10 opacity-100 leading-relaxed">
              Junte-se ao movimento que está transformando a mobilidade rural em São Luís. Conforto, economia e segurança a um toque de distância.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                href="/corridas?tipo=rural"
                className="bg-yellow-400 text-[#004d2b] px-10 py-5 rounded-3xl font-black text-lg hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/20 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <Ticket className="w-6 h-6" />
                Explorar Todas as Rotas
              </Link>
              <Link
                href="/contato"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3"
              >
                <Smartphone className="w-6 h-6" />
                Falar com Atendente
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
        
        @keyframes move-bus {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .animate-move-bus {
          animation: move-bus 4s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
