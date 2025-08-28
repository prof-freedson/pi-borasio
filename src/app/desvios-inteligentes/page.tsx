'use client';

import { ChevronLeft, TrafficCone, Map, Clock, AlertTriangle, Construction, Car, Info } from 'lucide-react';
import Link from 'next/link';

export default function DesviosInteligentesPage() {
  const activeDetours = [
    {
      icon: <Construction className="w-6 h-6 text-orange-600" />,
      title: "Obras na Av. dos Holandeses",
      description: "Redução de faixas próximo ao Shopping da Ilha",
      duration: "Até 15/12/2023",
      severity: "Alto",
      severityColor: "bg-red-100 text-red-800"
    },
    {
      icon: <TrafficCone className="w-6 h-6 text-yellow-600" />,
      title: "Interdição na Av. Daniel de La Touche",
      description: "Interdição parcial para reparos no asfalto",
      duration: "Até 10/12/2023",
      severity: "Médio",
      severityColor: "bg-yellow-100 text-yellow-800"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-blue-600" />,
      title: "Evento no Estádio Castelão",
      description: "Trânsito intenso esperado a partir das 16h",
      duration: "02/12/2023",
      severity: "Médio",
      severityColor: "bg-yellow-100 text-yellow-800"
    },
    {
      icon: <Car className="w-6 h-6 text-purple-600" />,
      title: "Feira do Livro na Praça Maria Aragão",
      description: "Vias próximas com fluxo alterado",
      duration: "Até 05/12/2023",
      severity: "Baixo",
      severityColor: "bg-green-100 text-green-800"
    }
  ];

  const alternativeRoutes = [
    {
      from: "Centro",
      to: "Renascença",
      usualTime: "25 min",
      alternativeTime: "18 min",
      savedTime: "7 min",
      route: "Av. Ferreira Gullar → Av. dos Africanos → Av. dos Franceses"
    },
    {
      from: "Jardim Renascença",
      to: "São Francisco",
      usualTime: "35 min",
      alternativeTime: "28 min",
      savedTime: "7 min",
      route: "Av. dos Holandeses → Av. dos Portugueses → Rua da Paz"
    },
    {
      from: "Tirirical",
      to: "Calhau",
      usualTime: "40 min",
      alternativeTime: "32 min",
      savedTime: "8 min",
      route: "Av. Casemiro Júnior → Av. dos Africanos → Av. Carlos Cunha"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Monitoramento Contínuo",
      description: "Sistema identifica congestionamentos, obras e eventos em tempo real",
      icon: <Map className="w-8 h-8 text-[#004d2b]" />
    },
    {
      step: "2",
      title: "Análise Inteligente",
      description: "Algoritmos calculam rotas alternativas mais eficientes",
      icon: <Clock className="w-8 h-8 text-[#004d2b]" />
    },
    {
      step: "3",
      title: "Notificação Imediata",
      description: "Você recebe alertas sobre rotas otimizadas antes e durante suas viagens",
      icon: <AlertTriangle className="w-8 h-8 text-[#004d2b]" />
    }
  ];

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Header */}
      <header className="bg-[#004d2b] text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/transito-inteligente" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-center flex-1">
            Desvios Inteligentes
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Conteúdo da página */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-[#004d2b] mb-4">
                Desvie de problemas no trânsito de São Luís
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Nosso sistema identifica automaticamente obras, eventos e congestionamentos, sugerindo as melhores rotas alternativas para economizar seu tempo.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-blue-700">
                  <strong>Atualmente monitorando:</strong> 12 obras, 3 eventos e 7 vias com trânsito intenso em São Luís
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/img/rota-inteligente.webp"
                alt="Ilustração de desvios inteligentes"
                className="rounded-lg w-full max-w-xs md:max-w-sm h-auto"
              />
            </div>
          </div>

          {/* Desvios Ativos */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-8 text-center">
              Desvios e interdições ativas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeDetours.map((detour, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {detour.icon}
                      <h4 className="text-xl font-bold text-gray-800">
                        {detour.title}
                      </h4>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${detour.severityColor}`}>
                      {detour.severity}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">
                    {detour.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{detour.duration}</span>
                    <button className="text-[#004d2b] font-medium hover:underline">
                      Ver rota alternativa →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rotas Alternativas */}
          <div className="bg-white rounded-xl p-8 shadow-md mb-16">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-8 text-center">
              Rotas alternativas recomendadas
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trajeto
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tempo usual
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tempo alternativo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Economia
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rota sugerida
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {alternativeRoutes.map((route, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{route.from}</div>
                        <div className="text-sm text-gray-500">para {route.to}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {route.usualTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {route.alternativeTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {route.savedTime}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {route.route}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Como Funciona */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-8 text-center">
              Como funcionam nossos desvios inteligentes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {howItWorks.map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-[#004d2b] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {step.step}
                  </div>
                  <div className="flex justify-center mb-4">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-bold text-[#004d2b] mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dicas de Trânsito */}
          <div className="bg-yellow-50 rounded-xl p-8 shadow-md mb-16 border-l-4 border-yellow-400">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-6 text-center">
              Dicas para enfrentar o trânsito em São Luís
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">📅 Planeje com antecedência</h4>
                <p className="text-gray-600">Verifique nossas rotas alternativas antes de sair, especialmente durante horários de pico.</p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">⏰ Saia mais cedo</h4>
                <p className="text-gray-600">Evite os horários de maior congestionamento (7h-9h e 17h-19h).</p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">🔄 Rotas alternativas</h4>
                <p className="text-gray-600">Conheça vias paralelas às avenidas principais para desviar de congestionamentos.</p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">📱 Ative notificações</h4>
                <p className="text-gray-600">Receba alertas em tempo real sobre mudanças no trânsito durante seu trajeto.</p>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-r from-[#004d2b] to-green-700 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Não seja pego pelo trânsito!</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Ative os desvios inteligentes e receba automaticamente as melhores rotas para evitar congestionamentos, obras e eventos.
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors shadow-md mx-2 mb-4 md:mb-0">
              Ativar Desvios Inteligentes
            </button>
            <Link 
              href="/transito-inteligente" 
              className="border border-white text-white font-semibold py-3 px-8 rounded-lg transition-colors mx-2"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}