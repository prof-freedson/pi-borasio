'use client';

import { ChevronLeft, Cpu, Satellite, BarChart3, Clock, Users, Shield, Database, MapPin, Bell, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function ComoFuncionaPage() {
  const steps = [
    {
      icon: <Satellite className="w-10 h-10 text-[#004d2b]" />,
      title: "Coleta de Dados em Tempo Real",
      description: "Nosso sistema captura informações de múltiplas fontes para entender o fluxo do trânsito:",
      details: [
        "Sensores urbanos e câmeras de monitoramento",
        "Dados de GPS dos veículos da frota",
        "Informações de órgãos oficiais de trânsito (CIRETRAN, DETRAN-MA)",
        "Relatos de usuários e motoristas parceiros"
      ]
    },
    {
      icon: <Cpu className="w-10 h-10 text-[#004d2b]" />,
      title: "Processamento Inteligente",
      description: "Utilizamos algoritmos de machine learning para analisar e prever padrões de tráfego:",
      details: [
        "Análise preditiva baseada em histórico de trânsito",
        "Reconhecimento de padrões sazonais e eventos especiais",
        "Processamento de rotas alternativas em milissegundos",
        "Aprendizado contínuo com cada viagem realizada"
      ]
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-[#004d2b]" />,
      title: "Análise e Otimização",
      description: "Transformamos dados brutos em insights acionáveis para melhorar seu deslocamento:",
      details: [
        "Cálculo do tempo de viagem com precisão de 92%",
        "Identificação de gargalos e pontos críticos",
        "Sugestão de rotas considerando múltiplos fatores",
        "Balanceamento de tráfego entre vias alternativas"
      ]
    },
    {
      icon: <Smartphone className="w-10 h-10 text-[#004d2b]" />,
      title: "Distribuição para Aplicativos",
      description: "As informações processadas são entregues de forma integrada aos usuários:",
      details: [
        "Integração transparente com app de motoristas e passageiros",
        "Atualizações em tempo real durante as corridas",
        "Notificações proativas sobre mudanças no trajeto",
        "Interface simples com informações claras para decisão rápida"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-[#004d2b]" />,
      title: "Economia de Tempo",
      description: "Redução média de 23% no tempo de deslocamento em São Luís"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#004d2b]" />,
      title: "Mais Segurança",
      description: "Evitação de áreas perigosas e rotas com histórico de criminalidade"
    },
    {
      icon: <Database className="w-8 h-8 text-[#004d2b]" />,
      title: "Menos Consumo",
      description: "Economia de combustível com rotas mais eficientes (até 18% de redução)"
    },
    {
      icon: <Users className="w-8 h-8 text-[#004d2b]" />,
      title: "Melhor Experiência",
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
    <div className="bg-green-50 min-h-screen">
      {/* Header */}
      <header className="bg-[#004d2b] text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/transito-inteligente" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-center flex-1">
            Como Funciona o Trânsito Inteligente
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Conteúdo da página */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Introdução */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#004d2b] mb-4">
              Tecnologia a serviço da mobilidade urbana
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nosso sistema de trânsito inteligente utiliza algoritmos avançados e dados em tempo real para transformar 
              sua experiência de deslocamento por São Luís. Conheça em detalhes como nossa tecnologia funciona.
            </p>
          </div>

          {/* Processo em 4 etapas */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-12 text-center">
              O processo em 4 etapas
            </h3>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className="bg-white rounded-full p-4 shadow-md">
                      {step.icon}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="bg-[#004d2b] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                        {index + 1}
                      </div>
                      <h4 className="text-xl font-bold text-[#004d2b]">{step.title}</h4>
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-2 h-2 bg-[#004d2b] rounded-full mt-2 mr-3"></div>
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefícios */}
          <div className="bg-white rounded-xl p-8 shadow-md mb-16">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-8 text-center">
              Vantagens do sistema inteligente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Especificações Técnicas */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-8 text-center">
              Especificações Técnicas
            </h3>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {technicalSpecs.map((spec, index) => (
                  <div key={index} className="text-center p-4 border border-green-100 rounded-lg">
                    <h4 className="font-bold text-[#004d2b] mb-2">{spec.title}</h4>
                    <p className="text-gray-600">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl p-8 shadow-md mb-16">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-8 text-center">
              Perguntas Frequentes
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg text-[#004d2b] mb-2">Como são coletados os dados de trânsito?</h4>
                <p className="text-gray-600">
                  Utilizamos uma combinação de fontes oficiais (CIRETRAN, DETRAN-MA), sensores urbanos, 
                  dados anônimos de GPS de nossa frota e relatos verificados de usuários. Todos os dados 
                  são agregados e anonimizados para preservar a privacidade.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#004d2b] mb-2">O sistema funciona em tempo real?</h4>
                <p className="text-gray-600">
                  Sim, nosso sistema processa informações a cada 45 segundos, garantindo que as rotas 
                  sugeridas reflitam as condições atuais do trânsito. Em caso de acidentes ou eventos 
                  imprevistos, as atualizações são ainda mais rápidas.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#004d2b] mb-2">É possível confiar nas rotas sugeridas?</h4>
                <p className="text-gray-600">
                  Nosso sistema tem 92% de precisão nas previsões de tempo de viagem. As rotas são testadas 
                  constantemente e aprimoradas com machine learning. Em caso de discrepância, usuários podem 
                  reportar problemas para melhorias contínuas.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-r from-[#004d2b] to-green-700 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Experimente na prática!</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Agora que você conhece nosso funcionamento, que tal experimentar na prática como o 
              trânsito inteligente pode transformar seus deslocamentos por São Luís?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/app-download" 
                className="inline-block bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
              >
                Baixar Aplicativo
              </Link>
              <Link 
                href="/transito-inteligente" 
                className="inline-block bg-transparent hover:bg-green-800 border border-white text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Voltar para Trânsito Inteligente
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}