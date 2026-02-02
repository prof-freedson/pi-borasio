'use client';

import {
  ChevronLeft,
  TrafficCone,
  Map,
  Clock,
  AlertTriangle,
  Construction,
  Car,
  Info,
  ShieldCheck,
  ArrowRight,
  Navigation,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DesviosInteligentesPage() {
  const activeDetours = [
    {
      icon: <Construction className="w-6 h-6" />,
      title: "Obras na Av. dos Holandeses",
      description: "Redução de faixas próximo ao Shopping da Ilha devido a recapeamento.",
      duration: "Até 15/12/2026",
      severity: "Alto",
      color: "red"
    },
    {
      icon: <TrafficCone className="w-6 h-6" />,
      title: "Interdição na Av. Daniel de La Touche",
      description: "Interdição parcial para reparos de emergência na rede de esgoto.",
      duration: "Até 10/12/2026",
      severity: "Médio",
      color: "amber"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Evento no Estádio Castelão",
      description: "Trânsito intenso esperado nas imediações a partir das 16h.",
      duration: "Hoje",
      severity: "Médio",
      color: "amber"
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "Fluxo Intenso na Península",
      description: "Vias próximas com fluxo alterado devido ao horário de pico.",
      duration: "Agora",
      severity: "Baixo",
      color: "blue"
    }
  ];

  const alternativeRoutes = [
    {
      from: "Centro",
      to: "Renascença",
      usualTime: "25 min",
      alternativeTime: "18 min",
      savedTime: "7 min",
      route: "Av. Ferreira Gullar → Av. dos Africanos"
    },
    {
      from: "Cohama",
      to: "São Francisco",
      usualTime: "35 min",
      alternativeTime: "28 min",
      savedTime: "7 min",
      route: "Av. do Aririzal → Estrada da Vitória"
    },
    {
      from: "Tirirical",
      to: "Calhau",
      usualTime: "45 min",
      alternativeTime: "32 min",
      savedTime: "13 min",
      route: "Av. Guajajaras → Av. dos Franceses"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Monitoramento em Tempo Real",
      description: "Nossa IA analisa congestionamentos, obras e eventos em toda a ilha simultaneamente.",
      icon: <Map className="w-6 h-6" />
    },
    {
      step: "02",
      title: "Cálculo de Rotas Dinâmicas",
      description: "Algoritmos avançados comparam milhares de trajetos para encontrar o desvio perfeito.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      step: "03",
      title: "Navegação Otimizada",
      description: "Você recebe alertas instantâneos e sua rota é atualizada automaticamente.",
      icon: <Navigation className="w-6 h-6" />
    }
  ];

  return (
    <div className="bg-green-100 min-h-screen font-poppins relative overflow-hidden pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#004d2b]/5 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#004d2b]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Header */}
      <section className="bg-[#004d2b] pt-12 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 V100 H0 Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-green-200 hover:text-yellow-400 transition-colors mb-8 group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold uppercase tracking-widest text-xs">Voltar para o Início</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/5 text-yellow-400 mb-6 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                Sistema Ativo em São Luís
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Desvios <span className="text-yellow-400">Inteligentes</span> que salvam seu dia
              </h1>
              <p className="text-xl text-green-50/80 mb-8 max-w-xl leading-relaxed">
                Nossa tecnologia identifica automaticamente obstruções e sugere rotas alternativas em tempo real, garantindo que você chegue ao seu destino sem estresse.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-bold rounded-2xl shadow-lg shadow-yellow-400/20 transition-all hover:-translate-y-1 flex items-center gap-2">
                  Ativar no meu App <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="img/rota-inteligente.jpg"
                  alt="Monitoramento de Tráfego"
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004d2b] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center text-[#004d2b]">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest font-bold text-yellow-400">Tempo Médio Economizado</div>
                      <div className="text-2xl font-bold">12 Minutos / Viagem</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-green-50 p-6 md:p-10 flex flex-wrap justify-around gap-8 text-center">
          <div>
            <div className="text-3xl font-extrabold text-[#004d2b]">12</div>
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Obras Ativas</div>
          </div>
          <div className="w-px h-12 bg-gray-100 hidden md:block" />
          <div>
            <div className="text-3xl font-extrabold text-[#004d2b]">85%</div>
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Precisão de Rotas</div>
          </div>
          <div className="w-px h-12 bg-gray-100 hidden md:block" />
          <div>
            <div className="text-3xl font-extrabold text-[#004d2b]">150k+</div>
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Usuários na Ilha</div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Active Detours */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-extrabold text-[#004d2b] mb-2 uppercase tracking-tight">Alertas em Tempo Real</h2>
                <p className="text-gray-500 font-medium">Fique por dentro das principais ocorrências na região metropolitana.</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#004d2b] bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                Live Update
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeDetours.map((detour, index) => (
                <div key={index} className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-green-50">
                  <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-colors ${detour.color === 'red' ? 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white' :
                      detour.color === 'amber' ? 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white' :
                        'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                    }`}>
                    {detour.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded ${detour.color === 'red' ? 'bg-red-100 text-red-700' :
                        detour.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                      }`}>
                      Risco {detour.severity}
                    </span>
                  </div>
                  <h4 className="text-lg font-extrabold text-[#004d2b] mb-3 group-hover:text-[#004d2b] transition-colors leading-tight">
                    {detour.title}
                  </h4>
                  <p className="text-gray-500 text-sm mb-6 font-medium">
                    {detour.description}
                  </p>
                  <div className="pt-6 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {detour.duration}
                    </div>
                    <button className="text-[#004d2b] hover:text-amber-600 flex items-center gap-1 transition-colors">
                      Rota <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Routes Table */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] border border-green-50 mb-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Car className="w-40 h-40 text-[#004d2b]" />
            </div>

            <div className="relative z-10 text-center mb-12">
              <h3 className="text-3xl font-extrabold text-[#004d2b] mb-4">Economize Tempo Hoje</h3>
              <p className="text-gray-500 max-w-xl mx-auto font-medium">Veja os trajetos que nossos algoritmos otimizaram nas últimas horas.</p>
            </div>

            <div className="overflow-x-auto rounded-[2rem] border border-gray-100">
              <table className="min-w-full divide-y divide-gray-100">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-8 py-5 text-left text-xs font-black text-[#004d2b] uppercase tracking-[0.2em]">Origem / Destino</th>
                    <th className="px-8 py-5 text-left text-xs font-black text-[#004d2b] uppercase tracking-[0.2em]">Tempo Normal</th>
                    <th className="px-8 py-5 text-left text-xs font-black text-[#004d2b] uppercase tracking-[0.2em]">Caminho BoraSiô</th>
                    <th className="px-8 py-5 text-left text-xs font-black text-[#004d2b] uppercase tracking-[0.2em]">Ganho</th>
                    <th className="px-8 py-5 text-left text-xs font-black text-[#004d2b] uppercase tracking-[0.2em]">Melhor Desvio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {alternativeRoutes.map((route, index) => (
                    <tr key={index} className="hover:bg-green-50/30 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="font-bold text-[#004d2b]">{route.from}</div>
                        <div className="text-xs font-bold text-gray-400">para {route.to}</div>
                      </td>
                      <td className="px-8 py-6 text-gray-500 font-medium">{route.usualTime}</td>
                      <td className="px-8 py-6 font-extrabold text-green-600">{route.alternativeTime}</td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-black rounded-full flex items-center gap-1 w-fit">
                          <Zap className="w-3 h-3 fill-green-700" /> {route.savedTime}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-500 font-medium group-hover:text-[#004d2b] transition-colors">
                        {route.route}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-24">
            <h3 className="text-3xl font-extrabold text-[#004d2b] mb-16 text-center">Como Funciona Nossa Tecnologia</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-200 to-transparent -z-10" />

              {howItWorks.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white rounded-full shadow-lg border-2 border-green-100 flex items-center justify-center mb-8 relative transition-all duration-500 group-hover:scale-110 group-hover:border-[#004d2b] group-hover:shadow-[#004d2b]/10">
                    <div className="bg-[#004d2b] text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-sm absolute -top-2 -right-2 border-4 border-white">
                      {step.step}
                    </div>
                    <div className="text-[#004d2b] group-hover:scale-110 transition-transform duration-500">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-[#004d2b] mb-3 group-hover:text-amber-600 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-gray-500 font-medium leading-relaxed max-w-[250px]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-amber-50 rounded-[3rem] p-10 md:p-16 border border-amber-100 mb-24 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div className="grid grid-cols-6 gap-4 p-8">
                {Array(24).fill(0).map((_, i) => <div key={i} className="w-10 h-10 rounded-full bg-amber-600" />)}
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <h3 className="text-3xl font-extrabold text-[#004d2b] mb-6 leading-tight">Dicas Pro para vencer o trânsito da Ilha</h3>
                <div className="space-y-6">
                  <div className="flex gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40">
                    <div className="w-10 h-10 shrink-0 bg-amber-400 rounded-xl flex items-center justify-center text-[#004d2b] font-bold">01</div>
                    <p className="text-gray-700 font-medium text-sm">Evite horários de pico extremos: <strong>07:00-09:00</strong> e <strong>17:30-19:30</strong>.</p>
                  </div>
                  <div className="flex gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 shadow-sm scale-105">
                    <div className="w-10 h-10 shrink-0 bg-amber-400 rounded-xl flex items-center justify-center text-[#004d2b] font-bold">02</div>
                    <p className="text-gray-700 font-medium text-sm">Prefira as "vias de escape" como as avenidas internas da Cohama e Renascença.</p>
                  </div>
                  <div className="flex gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40">
                    <div className="w-10 h-10 shrink-0 bg-amber-400 rounded-xl flex items-center justify-center text-[#004d2b] font-bold">03</div>
                    <p className="text-gray-700 font-medium text-sm">Mantenha as notificações do <strong>BoraSiô</strong> sempre ativas.</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#004d2b] rounded-3xl p-8 text-white">
                  <Info className="w-8 h-8 text-amber-400 mb-4" />
                  <h4 className="font-bold mb-2">Sabia que?</h4>
                  <p className="text-green-50/70 text-sm">Em 2025, o trânsito na Av. Guajajaras foi reduzido em 12% graças aos nossos trajetos combinados.</p>
                </div>
                <div className="bg-white rounded-3xl p-8 border border-amber-100 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                    <Construction className="w-6 h-6 text-[#004d2b]" />
                  </div>
                  <h4 className="font-bold text-[#004d2b] mb-2">Grandes Obras</h4>
                  <p className="text-gray-500 text-sm">Acompanhamos o cronograma da SMTT e Secretaria de Obras para antecipar desvios.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="bg-gradient-to-br from-[#004d2b] to-[#013b22] rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-[#004d2b]/20 group">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/10 group-hover:rotate-12 transition-transform duration-500">
                <Navigation className="w-10 h-10 text-yellow-400" />
              </div>
              <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Não perca mais tempo parado!</h3>
              <p className="text-green-50/60 max-w-2xl mx-auto mb-12 text-lg font-medium">
                Ative agora os desvios inteligentes no seu aplicativo e deixe que nossa IA encontre o melhor caminho para você.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="w-full sm:w-auto px-12 py-5 bg-white text-[#004d2b] font-bold rounded-2xl shadow-xl hover:bg-yellow-400 transition-all hover:scale-105">
                  Baixar o App Grátis
                </button>
                <Link
                  href="/transito-inteligente"
                  className="w-full sm:w-auto px-12 py-5 border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-white/5 transition-all"
                >
                  Explorar Mais Recursos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
