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
  Phone,
  Mail,
  Map,
  CheckCircle
} from 'lucide-react';

export default function ConexaoRuralTerminal() {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

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
    { id: 1, origin: "Tirirical", destination: "Terminal Cohab", time: "45 min", price: "R$ 12,00" },
    { id: 2, origin: "Vila Ariri", destination: "Terminal Praia Grande", time: "35 min", price: "R$ 10,00" },
    { id: 3, origin: "Anjo da Guarda", destination: "Terminal Cohama", time: "40 min", price: "R$ 11,00" },
    { id: 4, origin: "Maracanã", destination: "Terminal Cohab", time: "50 min", price: "R$ 13,00" },
    { id: 5, origin: "Sacavém", destination: "Terminal Praia Grande", time: "30 min", price: "R$ 9,00" }
  ];

  const steps = [
    { number: 1, title: "Baixe o App", description: "Instale o Bora Siô na sua loja de aplicativos" },
    { number: 2, title: "Selecione a Rota", description: "Escolha a opção 'Conexão Rural-Terminal' no menu" },
    { number: 3, title: "Agende sua Viagem", description: "Informe origem, destino, data e horário" },
    { number: 4, title: "Confirme", description: "Escolha a forma de pagamento e confirme sua viagem" }
  ];

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
          <Link 
            href="#agendar" 
            className="inline-flex items-center bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
          >
            Agendar Minha Viagem
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#004d2b] mb-12">Rotas e Terminais</h2>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-[#004d2b] mb-4 flex items-center gap-2">
                <Map className="w-5 h-5" />
                Principais Conexões
              </h3>
              
              <div className="space-y-4">
                {routes.map(route => (
                  <div 
                    key={route.id} 
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedRoute === route.id ? 'bg-green-50 border-2 border-[#004d2b]' : 'bg-gray-50 hover:bg-green-50'}`}
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{route.origin} → {route.destination}</h4>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{route.time}</span>
                        </div>
                      </div>
                      <span className="font-bold text-[#004d2b]">{route.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-2/3 bg-white rounded-xl p-6 shadow-md flex items-center justify-center">
              <div className="text-center">
                <div className="w-64 h-64 mx-auto bg-green-200 rounded-full flex items-center justify-center mb-6">
                  <Map className="w-32 h-32 text-[#004d2b]" />
                </div>
                <p className="text-gray-600">
                  Mapa interativo mostrando as rotas entre zona rural e terminais
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Em uma implementação real, aqui estaria integrado com Google Maps ou similar
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
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

      {/* CTA Section */}
      <section id="agendar" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#004d2b] to-[#006d3b] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para uma viagem mais acessível?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Junte-se a centenas de moradores da zona rural que já utilizam o Bora Siô para chegar aos terminais de São Luís com conforto e segurança.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/app-download" 
              className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
            >
              Baixar o App
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

      {/* Footer */}
      <footer className="bg-[#002e1c] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Bora Siô</h3>
              <p className="mb-4">
                Mobilidade com jeito maranhense, conectando São Luís de forma humana, segura e acessível.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-[#004d2b] transition-colors">
                  <span className="text-lg font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-[#004d2b] transition-colors">
                  <span className="text-lg font-bold">ig</span>
                </a>
                <a href="#" className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-[#004d2b] transition-colors">
                  <span className="text-lg font-bold">in</span>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Contato</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>(98) 3000-1000</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>contato@borasio.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>São Luís - MA</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}