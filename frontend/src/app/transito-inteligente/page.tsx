"use client";

import {
  ChevronLeft,
  Map,
  Clock,
  Smartphone,
  TrafficCone,
  AlertTriangle,
  BarChart2,
  Settings,
  Info,
  Bus,
  Zap,
  Navigation,
  Activity,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TransitoInteligentePage() {
  const features = [
    {
      icon: <Navigation className="w-8 h-8 text-yellow-400" />,
      title: "Rotas Otimizadas",
      description:
        "Evitamos vias congestionadas como Av. Guajajaras e Av. dos Holandeses usando algoritmos de IA em tempo real.",
      href: "/corridas",
      linkText: "Explorar rotas",
    },
    {
      icon: <Activity className="w-8 h-8 text-yellow-400" />,
      title: "Monitoramento Vivo",
      description:
        "Atualizações constantes do tráfego ludovicense para garantir que você nunca fique preso em engarrafamentos surpresa.",
      href: "/tempo-real",
      linkText: "Ver mapa ao vivo",
    },
    {
      icon: <Bus className="w-8 h-8 text-yellow-400" />,
      title: "Integração Total",
      description:
        "Conectamos a zona rural aos principais terminais (Praia Grande, Cohab e Cohama) com precisão cirúrgica.",
      href: "/conexao-rural-terminal",
      linkText: "Consultar conexões",
    },
    {
      icon: <TrafficCone className="w-8 h-8 text-yellow-400" />,
      title: "Desvios Dinâmicos",
      description:
        "Sugerimos alternativas instantâneas em caso de acidentes, obras ou eventos como o São João e Carnaval.",
      href: "/desvios-inteligentes",
      linkText: "Alertas ativos",
    },
  ];

  const trafficTips = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      title: "Horários de Pico",
      content: "Atenção redobrada na Av. dos Holandeses entre 7h-9h e 17h-19h.",
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-green-500" />,
      title: "Economia Real",
      content: "Usuários BoraSiô economizam em média 25 minutos diários em trajetos urbanos.",
    },
    {
      icon: <Settings className="w-6 h-6 text-[#004d2b]" />,
      title: "Perfil de Rota",
      content:
        "Personalize seu trajeto: prefira avenidas largas ou fuja de áreas escolares.",
    },
  ];

  return (
    <div className="bg-white min-h-screen selection:bg-yellow-400 selection:text-[#004d2b]">
      {/* Header - Estilo Borasiô Slim */}
      <header className="bg-[#004d2b] text-white py-6 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:bg-white/10 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-white/10"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-[#004d2b] fill-[#004d2b]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Trânsito Inteligente
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-green-900/50 border border-green-700 px-3 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-300">TRANSMISSÃO AO VIVO</span>
          </div>
        </div>
      </header>

      {/* Hero Section - Transito */}
      <section className="relative py-20 overflow-hidden bg-green-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-100/50 to-transparent -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#004d2b] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-[#004d2b]/20">
                <Activity className="w-4 h-4 text-yellow-400" /> Tecnologia Borasiô
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#004d2b] leading-[1.1]">
                Navegue por SLZ com <span className="text-green-600 italic">Precisão.</span>
              </h2>
              <p className="text-xl text-gray-600 text-justify leading-relaxed max-w-xl">
                Não somos apenas um mapa. Somos o cérebro da mobilidade na Ilha. Nosso sistema aprende com cada corrida para garantir que você chegue ao seu destino sem estresse.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/download"
                  className="bg-[#004d2b] hover:bg-[#003823] text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-xl hover:-translate-y-1 flex items-center gap-2"
                >
                  <Smartphone className="w-5 h-5" /> Ativar no App
                </Link>
                <Link
                  href="/como-funciona"
                  className="border-2 border-[#004d2b] text-[#004d2b] hover:bg-green-100 font-bold py-4 px-8 rounded-2xl transition-all flex items-center gap-2"
                >
                  <Info className="w-5 h-5" /> Como funciona
                </Link>
              </div>
            </div>
            <div className="relative max-w-md mx-auto lg:ml-auto lg:mr-0">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-[80px] opacity-20 -z-10"></div>
              <div className="rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="img/mapa-inteligente.jpg"
                  alt="Mapa de Trânsito Inteligente"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Funcionalidades - Estilo Moderno */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold text-[#004d2b]">Engenharia de Movimento</h3>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Soluções pensadas especificamente para os gargalos de São Luís.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-[2rem] border border-green-50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,77,43,0.15)] transition-all duration-500 group hover:-translate-y-2"
              >
                <div className="bg-[#004d2b] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#004d2b]/20 group-hover:rotate-6 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-[#004d2b] mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-500 mb-6 text-justify leading-relaxed">
                  {feature.description}
                </p>
                <Link href={feature.href} className="text-[#004d2b] font-black text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  {feature.linkText} <ChevronLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dicas e Inteligência de Localização */}
      <section className="py-24 bg-[#004d2b] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-8 md:p-16 border border-white/10">
            <h3 className="text-3xl font-bold mb-12 text-center">Inteligência Coletiva</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {trafficTips.map((tip, index) => (
                <div
                  key={index}
                  className="space-y-4 bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center">
                    {tip.icon}
                  </div>
                  <h4 className="font-bold text-xl text-yellow-400">{tip.title}</h4>
                  <p className="text-green-50/80 leading-relaxed text-justify">{tip.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Final */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400 rounded-full blur-[80px] opacity-20"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-400 rounded-full blur-[80px] opacity-20"></div>
          
          <h3 className="text-4xl md:text-5xl font-black text-[#004d2b] mb-6">Pronto para a fluidez total?</h3>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto text-justify md:text-center">
            Ative o modo trânsito inteligente e descubra por que milhares de passageiros já economizaram horas de vida nas ruas de São Luís.
          </p>
          <Link
            href="/download"
            className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-black py-5 px-12 rounded-2xl transition-all shadow-xl shadow-yellow-400/20 transform hover:scale-105 active:scale-95 text-xl"
          >
            <Zap className="w-6 h-6 fill-[#004d2b]" /> Começar agora
          </Link>
        </div>
      </section>
    </div>
  );
}
