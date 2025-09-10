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
} from "lucide-react";
import Link from "next/link";

export default function TransitoInteligentePage() {
  const features = [
    {
      icon: <Map className="w-8 h-8 text-[#004d2b]" />,
      title: "Rotas Otimizadas",
      description:
        "Evitamos vias congestionadas como Av. Guajajaras e Av. dos Holandeses usando dados em tempo real",
      href: "/corridas",
      linkText: "Ver rotas comuns",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#004d2b]" />,
      title: "Tempo Real",
      description:
        "Atualizações constantes do tráfego para calcular o trajeto mais rápido",
      href: "/tempo-real",
      linkText: "Monitorar trânsito",
    },
    {
      icon: <Bus className="w-8 h-8 text-[#004d2b]" />, // Ou <HeartHandshake> para acessibilidade
      title: "Conexão Rural-Terminal",
      description:
        "Rotas acessíveis ligando a zona rural aos terminais Praia Grande, Cohab e Cohama",
      href: "/conexao-rural-terminal",
      linkText: "Ver rotas e acessibilidades",
    },
    {
      icon: <TrafficCone className="w-8 h-8 text-[#004d2b]" />,
      title: "Desvios Inteligentes",
      description:
        "Recomenda alternativas quando há obras ou eventos na região",
      href: "/desvios-inteligentes",
      linkText: "Ver desvios ativos",
    },
  ];

  const trafficTips = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
      title: "Horários de Pico",
      content: "Evite a Av. dos Holandeses entre 7h-9h e 17h-19h",
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-blue-600" />,
      title: "Estatísticas",
      content: "Reduza em 30% seu tempo de viagem usando nossas rotas",
    },
    {
      icon: <Settings className="w-6 h-6 text-gray-600" />,
      title: "Personalização",
      content:
        "Configure preferências como 'evitar pontes' ou 'rotas mais curtas'",
    },
  ];

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Header */}
      <header className="bg-[#004d2b] text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-yellow-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-center flex-1">
            Trânsito Inteligente
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Conteúdo da página */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#004d2b] mb-4">
                Navegando por São Luís com eficiência
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Nosso sistema de trânsito inteligente evita congestionamentos e
                encontra as melhores rotas para sua carona, economizando seu
                tempo e combustível.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/app-download"
                  className="bg-[#004d2b] hover:bg-[#003320] text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Baixar App
                </Link>
                <Link
                  href="/como-funciona"
                  className="border border-[#004d2b] text-[#004d2b] font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Info className="w-4 h-4" />
                  Como funciona
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/img/mapa-inteligente.png"
                alt="Mapa com rotas inteligentes"
                className="rounded-lg shadow-lg w-full max-w-[200px] md:max-w-[250px] h-auto"
              />
            </div>
          </div>

          {/* Features */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-8 text-center">
              Como nosso trânsito inteligente funciona
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  href={feature.href}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-bold text-[#004d2b] mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <span className="text-[#004d2b] font-medium group-hover:underline">
                    {feature.linkText} →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Seção de Dicas */}
          <div className="mt-20 bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-6 text-center">
              Dicas para evitar o trânsito em São Luís
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trafficTips.map((tip, index) => (
                <div
                  key={index}
                  className="border-l-4 border-[#004d2b] pl-4 py-2"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {tip.icon}
                    <h4 className="font-bold text-lg">{tip.title}</h4>
                  </div>
                  <p className="text-gray-600">{tip.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Final */}
          <div className="mt-16 bg-gradient-to-r from-[#004d2b] to-green-700 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Experimente agora!</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Reduza seu tempo no trânsito e chegue mais rápido ao seu destino
              com nossas rotas inteligentes.
            </p>
            <Link
              href="/cadastro"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
            >
              Ativar Trânsito Inteligente
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
