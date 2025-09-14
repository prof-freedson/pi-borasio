'use client';

import { FaCarSide, FaRegLightbulb, FaRegHandshake, FaUsers, FaChartLine, FaMapMarkedAlt } from 'react-icons/fa';
import { MdSafetyDivider, MdPayment, MdSupportAgent } from 'react-icons/md';
import { IoIosRocket } from 'react-icons/io';

export default function SobrePage() {
  const stats = [
    { value: "10.000+", label: "Usuários ativos", icon: <FaUsers className="text-3xl" /> },
    { value: "95%", label: "Avaliação positiva", icon: <FaChartLine className="text-3xl" /> },
    { value: "24/7", label: "Suporte disponível", icon: <MdSupportAgent className="text-3xl" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="bg-[#004d2b] text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-6 animate-fade-in">
          Conheça o BoraSiô
        </h1>
        <p className="text-xl sm:text-2xl max-w-3xl mx-auto opacity-90">
          Revolucionando a mobilidade urbana em São Luís com tecnologia e compromisso
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* História */}
          <section className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-green-900 mb-6">Nossa História</h2>
                <p className="text-gray-700 text-lg mb-4">
                  O BoraSiô nasceu da necessidade de oferecer uma alternativa de transporte mais acessível e confiável em São Luís. 
                </p>
                <p className="text-gray-700 text-lg mb-4">
                  Começamos como um projeto comunitário e hoje conectamos milhares de passageiros a motoristas comprometidos, sempre com foco na qualidade do serviço.
                </p>
                <p className="text-gray-700 text-lg">
                  Nossa plataforma foi desenvolvida por apaixonados por mobilidade urbana que entendem os desafios de locomoção na cidade.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img 
                  src="/img/borasio.png" 
                  alt="Equipe BoraSiô no início" 
                  className="rounded-lg shadow-md w-full max-w-[300px] h-auto object-cover"
                />
              </div>
            </div>
          </section>

          {/* Restante do código permanece igual... */}
          {/* Missão, Visão e Valores */}
          <section className="bg-green-50 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">Nossos Pilares</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Missão */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="bg-green-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
                  <FaRegLightbulb className="text-green-800 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-3">Missão</h3>
                <p className="text-gray-600">
                  Tornar o transporte urbano mais acessível e econômico com corridas rápidas, seguras e com o melhor custo-benefício.
                </p>
              </div>

              {/* Visão */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="bg-green-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
                  <FaCarSide className="text-green-800 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-3">Visão</h3>
                <p className="text-gray-600">
                  Ser a principal opção de transporte para quem busca economia, conforto e confiança em São Luís.
                </p>
              </div>

              {/* Valores */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="bg-green-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
                  <FaRegHandshake className="text-green-800 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-3">Valores</h3>
                <p className="text-gray-600">
                  Transparência, honestidade, respeito e comprometimento com cada passageiro e motorista.
                </p>
              </div>
            </div>
          </section>

          {/* Diferenciais */}
          <section className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">O Que Nos Diferencia</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border-l-4 border-green-600 pl-4 py-2">
                <MdSafetyDivider className="text-green-800 text-4xl mb-3" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">Segurança</h3>
                <p className="text-gray-600">
                  Todos os motoristas são verificados e as corridas são monitoradas em tempo real.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4 py-2">
                <MdPayment className="text-green-800 text-4xl mb-3" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">Preço Justo</h3>
                <p className="text-gray-600">
                  Tarifas transparentes sem cobranças ocultas e opções de pagamento flexíveis.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4 py-2">
                <FaMapMarkedAlt className="text-green-800 text-4xl mb-3" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">Rotas Inteligentes</h3>
                <p className="text-gray-600">
                  Evitamos congestionamentos usando dados de tráfego em tempo real.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4 py-2">
                <IoIosRocket className="text-green-800 text-4xl mb-3" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">Inovação Constante</h3>
                <p className="text-gray-600">
                  Estamos sempre melhorando nossa plataforma para atender melhor nossos usuários.
                </p>
              </div>
            </div>
          </section>

          {/* Estatísticas */}
          <section className="bg-green-800 text-white p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-12 text-center">BoraSiô em Números</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-xl">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Final */}
          <section className="bg-gradient-to-r from-green-700 to-[#004d2b] text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para uma nova experiência em transporte?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Junte-se aos milhares de ludoviscenses que já escolheram o BoraSiô para suas viagens.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-green-800 hover:bg-green-100 font-semibold py-3 px-8 rounded-lg transition-colors shadow-md text-lg">
                Baixar o App
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors text-lg">
                Tornar-se Motorista
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}