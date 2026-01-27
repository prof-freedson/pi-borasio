'use client';

import { ChevronLeft, Cpu, Satellite, BarChart3, Clock, Users, Shield, Database, MapPin, Bell, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function ComoFuncionaPage() {
  const steps = [
    {
      icon: <Satellite className="w-10 h-10 text-white" />,
      title: "Coleta de Dados em Tempo Real",
      description: "Nosso sistema captura informações de múltiplas fontes para entender o fluxo do trânsito:",
      details: [
        "📡 Sensores urbanos e câmeras",
        "🛰️ Dados de GPS da frota",
        "🏛️ Órgãos oficiais (CIRETRAN)",
        "🤝 Relatos de motoristas"
      ]
    },
    {
      icon: <Cpu className="w-10 h-10 text-white" />,
      title: "Processamento Inteligente",
      description: "Utilizamos algoritmos de machine learning para analisar e prever padrões de tráfego:",
      details: [
        "🧠 Análise preditiva profunda",
        "⚡ Padrões sazonais em tempo real",
        "🤖 Rotas calculadas por IA",
        "💻 Aprendizado por quilômetro"
      ]
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-white" />,
      title: "Análise e Otimização",
      description: "Transformamos dados brutos em insights acionáveis para melhorar seu deslocamento:",
      details: [
        "📈 Precisão de 92% no tempo",
        "🎯 Identificação de gargalos",
        "🛣️ Sugestão de rotas curtas",
        "⚖️ Balanceamento de tráfego"
      ]
    },
    {
      icon: <Smartphone className="w-10 h-10 text-white" />,
      title: "Distribuição para Aplicativos",
      description: "As informações processadas são entregues de forma integrada aos usuários:",
      details: [
        "📱 Integração transparente app",
        "📲 Atualizações em tempo real",
        "🔔 Notificações proativas",
        "✅ Decisão rápida e segura"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-[#004d2b]" />,
      title: "⏰ Economia de Tempo",
      description: "Redução média de 23% no tempo de deslocamento em São Luís"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#004d2b]" />,
      title: "🛡️ Mais Segurança",
      description: "Evitação de áreas perigosas e rotas com histórico de criminalidade"
    },
    {
      icon: <Database className="w-8 h-8 text-[#004d2b]" />,
      title: "⛽ Menos Consumo",
      description: "Economia de combustível com rotas mais eficientes (até 18% de redução)"
    },
    {
      icon: <Users className="w-8 h-8 text-[#004d2b]" />,
      title: "⭐ Melhor Experiência",
      description: "Passageiros e motoristas mais satisfeitos com o serviço"
    }
  ];

  const technicalSpecs = [
    {
      title: "Cobertura",
      value: "92% das vias de São Luís mapeadas"
    },
    {
      title: "Atualização",
      value: "Dados renovados a cada 45 segundos"
    },
    {
      title: "Precisão",
      value: "92% de acerto nas previsões de tempo"
    },
    {
      title: "Latência",
      value: "Menos de 800ms desde a coleta até a distribuição"
    }
  ];

  return (
    <div className="min-h-screen bg-green-50/30 font-sans selection:bg-yellow-400 selection:text-[#004d2b]">
      {/* Header Premium */}
      <header className="bg-[#004d2b] text-white py-6 px-4 md:px-8 border-b border-white/5 sticky top-0 z-[100] shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/transito-inteligente" className="flex items-center gap-2 hover:bg-white/10 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-white/10">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <Cpu className="w-5 h-5 text-[#004d2b] fill-[#004d2b]" />
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight uppercase">Bastidores da Inovação</h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-green-900/50 border border-green-700 px-3 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-300">Infraestrutura IA</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-50 to-transparent -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#004d2b] text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#004d2b]/20">
               <Database className="w-3 h-3 text-yellow-400" /> Engenharia de Dados Própria
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#004d2b] leading-[1.1]">
              Como o Cérebro da Ilha <span className="text-green-600 block">Processa o Amanhã.</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Não é apenas um GPS. É uma rede neural urbana que analisa trilhões de dados por segundo para garantir que São Luís nunca pare de se mover.
            </p>
          </div>
        </div>
      </section>

      {/* Passo a Passo - Estilo Premium Cards */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="group bg-white p-10 rounded-[3rem] shadow-xl border border-green-50 hover:border-green-200 transition-all duration-500 relative overflow-hidden flex flex-col">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/5 rounded-full blur-[40px] group-hover:bg-yellow-400/10 transition-all"></div>
                
                <div className="flex items-start justify-between mb-8">
                   <div className="bg-[#004d2b] w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {step.icon}
                   </div>
                   <span className="text-6xl font-black text-green-50">{index + 1}</span>
                </div>

                <h3 className="text-2xl font-black text-[#004d2b] mb-4 uppercase tracking-tighter">{step.title}</h3>
                <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                  {step.description}
                </p>

                <div className="mt-auto space-y-4">
                   {step.details.map((detail, i) => (
                     <div key={i} className="flex items-center gap-3 bg-green-50/50 p-4 rounded-2xl border border-green-100/50 group-hover:bg-green-50 transition-colors">
                        <span className="text-xs font-bold text-[#004d2b] uppercase tracking-wide">{detail}</span>
                     </div>
                   ))}
                </div>
              </div>
            ))}
         </div>
      </section>

      {/* Especificações Técnicas - Minimalist Dashboard */}
      <section className="py-24 bg-[#004d2b] overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
               <h3 className="text-xs font-black text-yellow-400 uppercase tracking-[0.3em] mb-4">Performance do Sistema</h3>
               <h2 className="text-3xl md:text-5xl font-black text-white">Métricas em Tempo Real</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {technicalSpecs.map((spec, index) => (
                 <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] text-center group hover:bg-white/10 transition-all">
                    <p className="text-4xl font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform">{spec.value.split(' ')[0]}</p>
                    <p className="text-[10px] font-black text-green-100 uppercase tracking-widest opacity-60 mb-2">{spec.title}</p>
                    <p className="text-[10px] font-bold text-white/40">{spec.value.split(' ').slice(1).join(' ')}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Benefícios Grid */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
         <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden border-8 border-white">
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-100 rounded-full blur-[100px] opacity-50"></div>
            
            <div className="text-center mb-16">
               <h3 className="text-3xl md:text-4xl font-black text-[#004d2b] mb-4">Por que escolher o Inteligente?</h3>
               <p className="text-gray-500 font-medium">Resultados reais medidos pela nossa equipe de BI.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {benefits.map((benefit, index) => (
                 <div key={index} className="text-center space-y-4">
                    <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#004d2b]">
                       {benefit.icon}
                    </div>
                    <h4 className="font-black text-[#004d2b] uppercase text-xs tracking-widest">{benefit.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">{benefit.description}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
         <div className="text-center mb-16">
            <h3 className="text-3xl font-black text-[#004d2b]">Dúvidas Técnicas</h3>
         </div>
         <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-green-50 hover:bg-green-50/50 transition-all">
               <h4 className="font-black text-[#004d2b] mb-3 uppercase text-xs tracking-widest flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                  Como coletamos os dados?
               </h4>
               <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  Usamos IoT urbana, câmeras de visão computacional e telemetria anônima de frota para criar um mapa de calor dinâmico da cidade a cada 45 segundos.
               </p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-green-50 hover:bg-green-50/50 transition-all">
               <h4 className="font-black text-[#004d2b] mb-3 uppercase text-xs tracking-widest flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                  Privacidade dos Dados
               </h4>
               <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  Todos os dados de movimentação são criptografados e anonimizados. Nunca rastreamos indivíduos, apenas padrões de fluxo de massa para otimização pública.
               </p>
            </div>
         </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-4 text-center">
         <div className="bg-[#004d2b] py-20 px-8 rounded-[4rem] max-w-5xl mx-auto text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full blur-[120px] opacity-10"></div>
            <div className="relative z-10 space-y-8">
               <h3 className="text-4xl md:text-5xl font-black tracking-tighter">Pronto para o futuro?</h3>
               <p className="text-lg text-green-100/60 max-w-2xl mx-auto font-medium">
                  A tecnologia agora está ao seu alcance. Ative o modo inteligente e deixe a IA cuidar do seu trajeto.
               </p>
               <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/download" className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-black py-5 px-10 rounded-2xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-xs uppercase tracking-widest">
                     Ativar no Meu Celular
                  </Link>
                  <Link href="/transito-inteligente" className="bg-white/10 hover:bg-white/20 text-white font-black py-5 px-10 rounded-2xl transition-all border border-white/10 text-xs uppercase tracking-widest">
                     Explorar Mais
                  </Link>
               </div>
            </div>
         </div>
      </section>

      <footer className="py-12 border-t border-green-100">
        <p className="text-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
          &copy; 2024 BoraSiô | Inteligência Urbana São Luís
        </p>
      </footer>
    </div>
  );
}
