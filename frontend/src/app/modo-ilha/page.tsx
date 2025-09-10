'use client';

import { ChevronLeft, Map, Shield, Clock, Users, Anchor, Umbrella, ShoppingCart, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function ModoIlhaPage() {
  const features = [
    {
      icon: <Map className="w-8 h-8 text-[#004d2b]" />,
      title: "Rotas Inteligentes",
      description: "Conexões entre bairros considerando pontes e avenidas principais"
    },
    {
      icon: <Umbrella className="w-8 h-8 text-[#004d2b]" />,
      title: "Acesso às Praias",
      description: "Rotas para Calhau, Olho d'Água e Araçagy com alertas de trânsito na Litorânea"
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-[#004d2b]" />,
      title: "Feiras Livres",
      description: "Trajetos otimizados para Tirirical, Cohab e outras feiras da região"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#004d2b]" />,
      title: "Segurança",
      description: "Rotas por vias movimentadas e bem iluminadas"
    }
  ];

  const islandTips = [
    {
      title: "Praias",
      items: [
        "Evite a Av. Litorânea aos domingos (16h-20h)",
        "Estacionamento gratuito no Araçagy após 14h",
        "Rotas alternativas pelo Anel Viário"
      ]
    },
    {
      title: "Feiras",
      items: [
        "Tirirical: Melhor antes das 8h",
        "Cohab: Estacione na Rua 7",
        "Cohama: Evite às segundas (dia do lixo)"
      ]
    },
    {
      title: "Eventos",
      items: [
        "Festa Junina: Rotas especiais para arraiais",
        "Carnaval: Vias alternativas para blocos",
        "Bumba-Meu-Boi: Pontos de encontro por sotaque"
      ]
    }
  ];

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Header */}
      <header className="bg-[#004d2b] text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-center flex-1">
            Modo Ilha
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#004d2b] to-green-700 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Conectando São Luís como só o nativo conhece
            </h2>
            <p className="text-lg sm:text-xl mb-6">
              Rotas que entendem a ilha: das praias às feiras livres, passando pelos atalhos que só o maranhense sabe.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/cadastrar" 
                className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
              >
                Ativar Modo Ilha
              </Link>
              <Link 
                href="/corrida-em-grupo" 
                className="bg-white/10 hover:bg-white/20 font-semibold py-3 px-6 rounded-lg transition-colors border border-white"
              >
                Usar com Carona em Grupo
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://www.google.com/maps/vt/data=GNl3uTUjV2a2T_vMJfKvMkIGPKKiiCAReeCdVnwV4vPsQrMPR8Wqe71JNJ51BEt3dT8mZwUZkh_QYz5CZAt-qes-gIGzZjTEiKJH7l9Zy7wvdSo3mFNBa7QmY7Yc_s2khFHxh7HTI4t0V5wYX0h9EE86UZcYccYIPv3SOISF1QAjJVRtCK4hUb4jAYJE5RWxlwP0NLJaOISyTqzrbZQ9CT0Vg8eaWkvFzhxPyLFnj7so_fR12_KG2MIcJJ0RBMOtrVWgkwygnD1TjiW2L-Hfu67g6tOm2QI1" 
              alt="Mapa de São Luís com rotas estratégicas" 
              className="w-full max-w-[300px] md:max-w-[350px] rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#004d2b] mb-12">
            Navegue como quem conhece
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-green-50 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <div className="mb-4 p-3 bg-white rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#004d2b] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Island Tips Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#004d2b] mb-12">
            Dicas da Ilha
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {islandTips.map((tip, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-[#004d2b] mb-4 flex items-center gap-2">
                  {tip.title === "Praias" && <Umbrella className="w-5 h-5" />}
                  {tip.title === "Feiras" && <ShoppingCart className="w-5 h-5" />}
                  {tip.title === "Eventos" && <Calendar className="w-5 h-5" />}
                  {tip.title}
                </h3>
                <ul className="space-y-2">
                  {tip.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-gray-600">
                      <span className="text-[#004d2b]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#004d2b] to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Viva São Luís sem trânsito!
          </h2>
          <p className="text-xl mb-8">
            Baixe o app e descubra como chegar mais rápido em qualquer canto da ilha.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/download" 
              className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors shadow-md text-lg"
            >
              Baixar Aplicativo
            </Link>
            <Link 
              href="/eventos-culturais" 
              className="bg-white/10 hover:bg-white/20 font-semibold py-3 px-8 rounded-lg transition-colors border border-white text-lg"
            >
              Ver Eventos Culturais
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}