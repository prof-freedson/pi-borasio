'use client';

import { ChevronLeft, Smartphone, Link as LinkIcon, RefreshCw, Shield, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function IntegracaoAppPage() {
  const integrationSteps = [
    {
      step: "1",
      title: "Conectar Conta",
      description: "Faça login no aplicativo de transporte com sua conta existente",
      icon: <LinkIcon className="w-6 h-6 text-[#004d2b]" />
    },
    {
      step: "2",
      title: "Ativar Integração",
      description: "Habilite as permissões necessárias para compartilhar dados de localização",
      icon: <RefreshCw className="w-6 h-6 text-[#004d2b]" />
    },
    {
      step: "3",
      title: "Personalizar Preferências",
      description: "Configure como deseja receber alertas e sugestões de rotas",
      icon: <Zap className="w-6 h-6 text-[#004d2b]" />
    },
    {
      step: "4",
      title: "Começar a Usar",
      description: "Pronto! Suas rotas serão otimizadas automaticamente",
      icon: <CheckCircle className="w-6 h-6 text-[#004d2b]" />
    }
  ];

  const supportedApps = [
    {
      name: "Uber",
      logo: "/img/uber.png",
      status: "Conectado",
      statusColor: "text-green-600"
    },
    {
      name: "99",
      logo: "/img/99.jpeg",
      status: "Conectado",
      statusColor: "text-green-600"
    },
    {
      name: "InDrive",
      logo: "/img/inDrive.png",
      status: "Pendente",
      statusColor: "text-yellow-600"
    },
    {
      name: "Cabify",
      logo: "/img/cabify.png",
      status: "Não conectado",
      statusColor: "text-gray-600"
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-[#004d2b]" />,
      title: "Segurança Garantida",
      description: "Suas credenciais são criptografadas e nunca compartilhamos dados pessoais"
    },
    {
      icon: <Zap className="w-8 h-8 text-[#004d2b]" />,
      title: "Sincronização Instantânea",
      description: "As rotas são atualizadas automaticamente em todos os aplicativos conectados"
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-[#004d2b]" />,
      title: "Atualizações em Tempo Real",
      description: "Receba alertas de trânsito mesmo durante corridas em andamento"
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
            Integração com Apps
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
                Conecte seus aplicativos de transporte
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Integre seus apps de mobilidade favoritos para receber rotas otimizadas automaticamente, evitando trânsito e economizando tempo em suas corridas.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-blue-700">
                  <strong>Dica:</strong> Conecte pelo menos dois aplicativos para comparar rotas e tarifas automaticamente.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/img/app-integration.png"
                alt="Ilustração de integração de aplicativos"
                className="rounded-lg w-full max-w-xs md:max-w-sm h-auto"
              />
            </div>
          </div>

          {/* Aplicativos Suportados */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-8 text-center">
              Aplicativos disponíveis para integração
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportedApps.map((app, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <img
                      src={app.logo}
                      alt={`Logo ${app.name}`}
                      className="h-10 object-contain"
                    />
                    <span className={`text-sm font-medium ${app.statusColor}`}>
                      {app.status}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {app.name}
                  </h4>
                  <button className="w-full mt-4 bg-[#004d2b] hover:bg-[#003320] text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Conectar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Como Conectar */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-8 text-center">
              Como conectar seus aplicativos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {integrationSteps.map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md relative">
                  <div className="absolute -top-3 -left-3 bg-[#004d2b] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="mb-4">
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

          {/* Benefícios */}
          <div className="bg-white rounded-xl p-8 shadow-md mb-16">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-8 text-center">
              Vantagens da integração
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h4 className="text-xl font-bold text-[#004d2b] mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl p-8 shadow-md mb-16">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-8 text-center">
              Perguntas Frequentes
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">É seguro conectar meus aplicativos?</h4>
                <p className="text-gray-600">Sim, utilizamos protocolos de segurança avançados e não armazenamos suas credenciais de login. A conexão é feita através de APIs oficiais e seguras.</p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Preciso pagar para usar a integração?</h4>
                <p className="text-gray-600">Não, a integração com aplicativos é um serviço gratuito para todos os usuários do nosso sistema de trânsito inteligente.</p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Quais dados são compartilhados?</h4>
                <p className="text-gray-600">Compartilhamos apenas informações de localização e rotas necessárias para otimizar seu trajeto. Dados pessoais e de pagamento nunca são acessados.</p>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-r from-[#004d2b] to-green-700 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Simplifique suas corridas!</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Conecte seus aplicativos de transporte e comece a receber rotas inteligentes que evitam trânsito e economizam seu tempo.
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors shadow-md mx-2 mb-4 md:mb-0">
              Conectar Apps Agora
            </button>
            <Link 
              href="/transito-inteligente" 
              className="border border-white text-white font-semibold py-3 px-8 rounded-lg transition-colors mx-2"
            >
              Saber Mais
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}