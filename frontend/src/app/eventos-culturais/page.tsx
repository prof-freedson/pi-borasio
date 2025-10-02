'use client';

import { ChevronLeft, Calendar, Music, MapPin, Users, Clock, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Interface para os eventos
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  price: string;
  rating: number;
  participants: number;
}

export default function EventosCulturaisPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // API gratuita - usando mock data com possibilidade de integração real
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Em um cenário real, você usaria uma API como:
        // const response = await fetch('https://api.eventful.com/json/events/search?location=São Luís,MA&app_key=SUA_CHAVE');
        // const data = await response.json();
        
        // Mock data baseada em eventos reais de São Luís
        const mockEvents: Event[] = [
          {
            id: '1',
            title: 'Festa do Bumba Meu Boi',
            description: 'Apresentações dos sotaques de zabumba, matraca e orquestra no Centro de Cultura Popular',
            date: '2024-06-23',
            time: '19:00',
            location: 'Centro de Cultura Popular Domingos Vieira Filho',
            category: 'cultural',
            image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
            price: 'Grátis',
            rating: 4.8,
            participants: 250
          },
          {
            id: '2',
            title: 'Arraial da Lagoa',
            description: 'Festão junino com comidas típicas, quadrilhas e forró pé-de-serra',
            date: '2024-06-28',
            time: '18:00',
            location: 'Lagoa da Jansen',
            category: 'festival',
            image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=300&fit=crop',
            price: 'R$ 10,00',
            rating: 4.5,
            participants: 180
          },
          {
            id: '3',
            title: 'Tambor de Crioula',
            description: 'Roda de tambor de crioula na Praça Maria Aragão',
            date: '2024-06-30',
            time: '16:00',
            location: 'Praça Maria Aragão',
            category: 'cultural',
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop',
            price: 'Grátis',
            rating: 4.9,
            participants: 120
          },
          {
            id: '4',
            title: 'Reggae na Ponta d´Areia',
            description: 'Noite de reggae com DJs locais e banda ao vivo',
            date: '2024-07-05',
            time: '21:00',
            location: 'Ponta d´Areia',
            category: 'music',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
            price: 'R$ 20,00',
            rating: 4.3,
            participants: 300
          },
          {
            id: '5',
            title: 'Feira do Livro',
            description: 'Feira literária com autores maranhenses e atrações culturais',
            date: '2024-07-12',
            time: '14:00',
            location: 'Convento das Mercês',
            category: 'educational',
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
            price: 'Grátis',
            rating: 4.6,
            participants: 90
          },
          {
            id: '6',
            title: 'São João da Rena',
            description: 'Quadrilha junina competitiva e shows regionais',
            date: '2024-06-25',
            time: '20:00',
            location: 'São José de Ribamar',
            category: 'festival',
            image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop',
            price: 'R$ 15,00',
            rating: 4.7,
            participants: 200
          }
        ];

        setEvents(mockEvents);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = [
    { id: 'all', name: 'Todos', icon: '🎭' },
    { id: 'cultural', name: 'Cultural', icon: '🏛️' },
    { id: 'festival', name: 'Festival', icon: '🎪' },
    { id: 'music', name: 'Música', icon: '🎵' },
    { id: 'educational', name: 'Educativo', icon: '📚' }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

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
      title: "Encontre Eventos",
      description: "Explore os eventos culturais de São Luís"
    },
    {
      step: "2",
      title: "Ative o Modo Evento",
      description: "Selecione o evento que você vai participar no app"
    },
    {
      step: "3",
      title: "Encontre sua Carona",
      description: "Conecte-se com pessoas indo para o mesmo evento"
    },
    {
      step: "4",
      title: "Curta sem Preocupação",
      description: "Aproveite a cultura maranhense com transporte garantido"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#004d2b] to-green-700 text-white py-6 px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-center flex-1">
            Eventos Culturais
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#004d2b] via-green-700 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Viva a cultura maranhense com tranquilidade
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Rotas especiais e caronas compartilhadas para os principais eventos culturais de São Luís.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#eventos"
                className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explorar Eventos
              </Link>
              <Link
                href="/transito-inteligente"
                className="bg-white/10 hover:bg-white/20 font-semibold py-3 px-8 rounded-lg transition-all border border-white/30 hover:border-white/50"
              >
                Ver Rotas Inteligentes
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <img
                src="https://static.todamateria.com.br/upload/fe/st/festadobumbameuboi-cke.jpg"
                alt="Cultura maranhense - Bumba Meu Boi"
                className="w-full max-w-md rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
              />
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-[#004d2b] px-4 py-2 rounded-lg font-bold">
                🎭 50+ Eventos
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eventos em Destaque */}
      <section id="eventos" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#004d2b] mb-4">
              Eventos em São Luís
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra os melhores eventos culturais e encontre caronas compartilhadas
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#004d2b] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Grid de Eventos */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004d2b] mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando eventos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map(event => (
                <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#004d2b] px-3 py-1 rounded-full font-bold text-sm">
                      {event.price}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 flex-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-500 ml-2">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-semibold">{event.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(event.date).toLocaleDateString('pt-BR')} • {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{event.participants} pessoas confirmadas</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 bg-[#004d2b] hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center flex items-center justify-center gap-2">
                        <Users className="w-4 h-4" />
                        Encontrar Carona
                      </button>
                      <button className="bg-green-100 hover:bg-green-200 text-[#004d2b] p-3 rounded-lg transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#004d2b] mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600">
              Encontre eventos e garanta sua carona em poucos passos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-[#004d2b] rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {item.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-10 left-full w-8 h-1 bg-[#004d2b]/20 -ml-4 group-hover:bg-[#004d2b]/40 transition-colors"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#004d2b] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dicas de Segurança */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#004d2b] to-green-700 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6">
                  🌟 Segurança em Primeiro Lugar
                </h2>
                <div className="grid gap-4">
                  {[
                    "Combine encontros em locais movimentados e seguros",
                    "Verifique as avaliações dos outros usuários",
                    "Use o botão de emergência do app se precisar",
                    "Compartilhe sua rota com amigos ou familiares",
                    "Prefira caronas em grupo para eventos noturnos"
                  ].map((tip, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md">
                  <img
                    src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop"
                    alt="Pessoas se divertindo em evento cultural com segurança"
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#004d2b] to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Não perca nenhum evento cultural!
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Cadastre-se e receba alertas de eventos e rotas especiais na sua região.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cadastrar"
              className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-bold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl text-lg transform hover:-translate-y-1"
            >
              📅 Receber Alertas de Eventos
            </Link>
            <Link
              href="/modo-ilha"
              className="bg-white/10 hover:bg-white/20 font-semibold py-4 px-8 rounded-lg transition-all border border-white/30 hover:border-white/50 text-lg"
            >
              🏝️ Modo Ilha
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}