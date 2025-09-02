'use client';

import { ChevronLeft, Calendar, Music, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

export default function EventosCulturaisPage() {
  const featuredEvents = [
    {
      name: "Festa Junina",
      description: "Rotas especiais para os principais arraiais da cidade",
      icon: <Music className="w-6 h-6 text-[#004d2b]" />,
      months: "Junho-Julho"
    },
    {
      name: "Bumba-Meu-Boi",
      description: "Caronas para as apresentações nos sotaques da ilha",
      icon: <Users className="w-6 h-6 text-[#004d2b]" />,
      months: "Junho-Julho"
    },
    {
      name: "Carnaval",
      description: "Trajetos otimizados para os blocos tradicionais",
      icon: <Music className="w-6 h-6 text-[#004d2b]" />,
      months: "Fevereiro"
    },
    {
      name: "Festivais de Cultura Popular",
      description: "Acesso facilitado aos eventos culturais locais",
      icon: <MapPin className="w-6 h-6 text-[#004d2b]" />,
      months: "Todo o ano"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Ative o Modo Evento",
      description: "No app, selecione o tipo de evento que você vai participar"
    },
    {
      step: "2",
      title: "Escolha seu destino",
      description: "Selecione o local específico do evento (arraial, terreiro, etc.)"
    },
    {
      step: "3",
      title: "Encontre sua carona",
      description: "Conecte-se com motoristas ou passageiros indo para o mesmo evento"
    },
    {
      step: "4",
      title: "Curta o evento",
      description: "Chegue sem preocupações e aproveite a cultura maranhense"
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
            Eventos Culturais
          </h1>
          <div className="w-8"></div> {/* Espaçamento balanceado */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#004d2b] to-green-700 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Viva a cultura maranhense com tranquilidade
            </h2>
            <p className="text-lg sm:text-xl mb-6">
              Rotas especiais e caronas compartilhadas para os principais eventos culturais de São Luís e região.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/pessoal/cadastro"
                className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
              >
                Quero Participar
              </Link>
              <Link
                href="/transito-inteligente"
                className="bg-white/10 hover:bg-white/20 font-semibold py-3 px-6 rounded-lg transition-colors border border-white"
              >
                Ver Rotas Inteligentes
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://static.todamateria.com.br/upload/fe/st/festadobumbameuboi-cke.jpg"
              alt="Ilustração de festa junina e Bumba-Meu-Boi"
              className="w-full max-w-[280px] md:max-w-[320px] rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#004d2b] mb-12">
            Principais Eventos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredEvents.map((event, index) => (
              <div key={index} className="bg-green-50 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <div className="mb-4 p-3 bg-white rounded-full">
                  {event.icon}
                </div>
                <h3 className="text-xl font-bold text-[#004d2b] mb-2">
                  {event.name}
                </h3>
                <p className="text-gray-600 mb-3">
                  {event.description}
                </p>
                <div className="mt-auto bg-[#004d2b]/10 text-[#004d2b] px-3 py-1 rounded-full text-sm font-medium">
                  {event.months}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#004d2b] mb-12">
            Como funciona para eventos
          </h2>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 bg-[#004d2b]/20 transform -translate-x-1/2"></div>

            <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
              {howItWorks.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex ${index % 2 === 0 ? 'lg:pr-8 justify-start' : 'lg:pl-8 justify-end'}`}
                >
                  <div className="max-w-md">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#004d2b] text-white font-bold mr-4">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-bold text-[#004d2b]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 pl-14">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety Tips Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#004d2b] rounded-xl p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Dicas de Segurança para Eventos
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Combine o ponto de encontro em local seguro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Verifique a avaliação do motorista/passageiro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Use o botão de emergência do app se necessário</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Prefira caronas em grupo para eventos noturnos</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="/img/seguranca-eventos.png"
                  alt="Dicas de segurança para eventos culturais"
                  className="rounded-lg shadow-lg max-w-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#004d2b] to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Não perca os próximos eventos culturais!
          </h2>
          <p className="text-xl mb-8">
            Cadastre-se para receber alertas quando criarmos rotas especiais para os eventos da sua região.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cadastrar"
              className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors shadow-md text-lg"
            >
              Quero Avisos de Eventos
            </Link>
            <Link
              href="/modo-ilha"
              className="bg-white/10 hover:bg-white/20 font-semibold py-3 px-8 rounded-lg transition-colors border border-white text-lg"
            >
              Conheça o Modo Ilha
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}