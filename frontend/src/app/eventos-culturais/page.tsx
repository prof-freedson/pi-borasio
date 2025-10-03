'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, DollarSign, Music, Star, ExternalLink, Shield, CheckCircle, Eye, Users as UsersIcon, Map } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Interface para tipagem dos eventos
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  category: string;
  price: string;
  image: string;
  url: string;
  type: 'gratuito' | 'pago';
  participants: number;
}

export default function EventosSaoLuisPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchEventbriteEvents = async () => {
      try {
        const API_TOKEN = process.env.NEXT_PUBLIC_EVENTBRITE_TOKEN;
        
        console.log('Token:', API_TOKEN); // Debug

        const response = await fetch(
          `https://www.eventbriteapi.com/v3/events/search/?` +
          `q=São Luís&` +
          `location.address=Sao Luis, MA&` +
          `location.within=50km&` +
          `expand=venue,logo&` +
          `sort_by=date&` +
          `page_size=20`,
          {
            headers: {
              'Authorization': `Bearer ${API_TOKEN}`
            }
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Dados da API:', data); // Debug
        
        if (data.events) {
          const formattedEvents: Event[] = data.events.map((event: any) => ({
            id: event.id,
            title: event.name.text,
            description: event.description?.text ? 
              event.description.text.substring(0, 150) + '...' : 
              `Evento em ${event.venue?.name || 'São Luís'}`,
            date: event.start.local,
            time: event.start.local.split('T')[1]?.substring(0, 5) || '19:00',
            location: event.venue?.name || 'São Luís, MA',
            address: event.venue?.address?.localized_address_display || 'São Luís, Maranhão',
            category: event.category?.name || 'Evento',
            price: event.is_free ? 'Grátis' : 
                  (event.ticket_availability?.minimum_ticket_price ? 
                    `R$ ${(event.ticket_availability.minimum_ticket_price.major_value || 0).toFixed(2)}` : 
                    'Preço a definir'),
            image: event.logo?.url || getDefaultImage(event.category?.name),
            url: event.url,
            type: event.is_free ? 'gratuito' : 'pago',
            participants: Math.floor(Math.random() * 200) + 50
          }));
          
          setEvents(formattedEvents);
        }
      } catch (error) {
        console.log('Erro ao buscar eventos, usando dados de exemplo:', error);
        setEvents(getMockEvents());
      } finally {
        setLoading(false);
      }
    };

    fetchEventbriteEvents();
  }, []);

  // Função para redirecionar para a rota de corridas
  const handlePedirCorrida = (event: Event) => {
    // Redireciona para a rota de corridas com os dados do evento
    router.push(`/corridas?evento=${encodeURIComponent(event.title)}&local=${encodeURIComponent(event.location)}`);
  };

  // Imagem padrão baseada na categoria
  const getDefaultImage = (category: string) => {
    const images: { [key: string]: string } = {
      'Music': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      'Food & Drink': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      'Arts': 'https://images.unsplash.com/photo-1542327897-d73f4002b7fe?w=400&h=300&fit=crop',
      'Business': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      'default': 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop'
    };
    return images[category] || images.default;
  };

  // Dados de exemplo para desenvolvimento (caso a API falhe)
  const getMockEvents = (): Event[] => {
    return [
      {
        id: '1',
        title: 'Festival de Bumba Meu Boi 2024',
        description: 'Celebração da cultura maranhense com apresentações dos principais grupos de Bumba Meu Boi da região. Uma noite mágica de tradição e folclore.',
        date: '2024-06-28T18:00:00',
        time: '18:00',
        location: 'Centro de Cultura Popular',
        address: 'Rua do Giz, 221 - Centro, São Luís - MA',
        category: 'Cultural',
        price: 'Grátis',
        image: 'https://escolaepocaserrana.com.br/wp-content/uploads/2023/06/bumba_meu_boi_20.06.2022.jpg',
        url: '#',
        type: 'gratuito',
        participants: 187
      },
      {
        id: '2',
        title: 'Noite do Reggae - Edição Especial',
        description: 'DJs locais e banda ao vivo tocando os maiores sucessos do reggae. Ambiente descontraído na orla de São Luís.',
        date: '2024-07-05T22:00:00',
        time: '22:00',
        location: 'Ponta d\'Areia',
        address: 'Av. dos Holandeses - Ponta d\'Areia, São Luís - MA',
        category: 'Music',
        price: 'Pago',
        image: 'https://agazetadoacre.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-19-at-09.00.53.webp',
        url: '#',
        type: 'pago',
        participants: 234
      },
      {
        id: '3',
        title: 'Arraial da Lagoa 2024',
        description: 'O tradicional festejo junino da Lagoa da Jansen com quadrilhas, comidas típicas e muito forró pé-de-serra.',
        date: '2024-06-29T19:00:00',
        time: '19:00',
        location: 'Lagoa da Jansen',
        address: 'Av. dos Holandeses, São Luís - MA',
        category: 'Festival',
        price: 'Grátis',
        image: 'img/arraial_lagoa.jpg',
        url: '#',
        type: 'gratuito',
        participants: 156
      },
      {
        id: '4',
        title: 'Feira do Livro de São Luís',
        description: 'Encontros com autores, lançamentos literários e atividades culturais. Promovendo a literatura maranhense.',
        date: '2024-07-12T14:00:00',
        time: '14:00',
        location: 'Convento das Mercês',
        address: 'Rua da Palma, 502 - Centro, São Luís - MA',
        category: 'Education',
        price: 'Grátis',
        image: 'https://s2-g1.glbimg.com/8U5QglJTq4KccwfofXKIcj8CnjQ=/0x0:881x641/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/L/p/gg5s7GSva0cMFYt63Rzw/foto1-prefeitura-de-sao-luis-abre-15a-edicao-da-feira-do-livro-nesta-segunda-feira-5-no-centro-de-convencoes-da-ufma.jpeg',
        url: '#',
        type: 'gratuito',
        participants: 89
      },
      {
        id: '5',
        title: 'Workshop de Gastronomia Maranhense',
        description: 'Aprenda a preparar pratos típicos como arroz de cuxá, peixe frito e tortas regionais com chefs locais.',
        date: '2024-07-08T15:00:00',
        time: '15:00',
        location: 'Senac Culinary',
        address: 'Rua de Santaninha, 266 - Centro, São Luís - MA',
        category: 'Food & Drink',
        price: 'Pago',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1ZcEeQJ_2_nzKxFsLxyFCltH_VVA-jeJa6Q&s',
        url: '#',
        type: 'pago',
        participants: 45
      },
      {
        id: '6',
        title: 'Tour Histórico pelo Centro Antigo',
        description: 'Passeio guiada pelas ruas e becos do centro histórico, conhecendo a arquitetura e história de São Luís.',
        date: '2024-07-06T09:00:00',
        time: '09:00',
        location: 'Centro Histórico',
        address: 'Praça Dom Pedro II - Centro, São Luís - MA',
        category: 'Travel & Outdoor',
        price: 'Grátis',
        image: 'https://www.voltologo.net/wp-content/uploads/2023/02/centro-historico-de-sao-luis-dicas.jpg.webp',
        url: '#',
        type: 'gratuito',
        participants: 67
      }
    ];
  };

  const categories = [
    { id: 'all', name: 'Todos', count: events.length },
    { id: 'gratuito', name: 'Gratuitos', count: events.filter(e => e.type === 'gratuito').length },
    { id: 'pago', name: 'Pagos', count: events.filter(e => e.type === 'pago').length },
    { id: 'music', name: 'Música', count: events.filter(e => e.category === 'Music').length },
    { id: 'cultural', name: 'Cultural', count: events.filter(e => e.category.includes('Cultural')).length }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredEvents = selectedCategory === 'all' ? events : 
    selectedCategory === 'gratuito' ? events.filter(e => e.type === 'gratuito') :
    selectedCategory === 'pago' ? events.filter(e => e.type === 'pago') :
    events.filter(e => e.category.toLowerCase().includes(selectedCategory));

  // Formatação de data que funciona tanto no servidor quanto no cliente
  const formatEventDate = (dateString: string, time: string) => {
    if (!isClient) {
      return `${time}`; // Retorna apenas o tempo no servidor
    }
    
    try {
      const date = new Date(dateString);
      return `${date.toLocaleDateString('pt-BR', { 
        weekday: 'short',
        day: '2-digit',
        month: 'short'
      })} • ${time}`;
    } catch {
      return time;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#004d2b] to-green-700 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Eventos em São Luís
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto mb-6">
            Descubra os melhores eventos culturais, shows e festivais da capital maranhense
          </p>
          
          {/* Seção Informativa sobre Eventos e Caronas */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 text-left max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-green-50">✨ Viva a Cultura de São Luís!</h2>
            <p className="text-green-100 mb-4">
              São Luís, a <strong>Ilha do Amor</strong>, é palco de uma rica cena cultural com <strong>festas tradicionais, 
              shows de reggae, festivais de Bumba Meu Boi</strong> e muito mais. De eventos gratuitos na praça 
              a grandes shows na orla, há sempre algo especial acontecerendo na cidade.
            </p>
            <p className="text-green-100 mb-4">
              <strong>🚗 A carona solidária te leva com segurança</strong> para curtir os melhores eventos da cidade, 
              evitando preocupações com estacionamento e trânsito, além de ser uma opção econômica e sustentável.
            </p>
          </div>

          {/* Seção de Segurança - Focada em Eventos e Caronas */}
          <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-8 max-w-4xl mx-auto shadow-xl border border-green-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Dicas de Segurança</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-green-50">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Verifique o Motorista</h4>
                      <p className="text-gray-600 text-sm">
                        Confirme a foto, nome e placa do veículo antes de entrar na carona
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-green-50">
                    <Eye className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Compartilhe seu Trajeto</h4>
                      <p className="text-gray-600 text-sm">
                        Avise amigos ou familiares sobre seu destino e horário estimado
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-green-50">
                    <UsersIcon className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Prefira Locais Movimentados</h4>
                      <p className="text-gray-600 text-sm">
                        Combine encontros em pontos conhecidos e bem iluminados para embarque
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-green-50">
                    <Map className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Conheça o Evento</h4>
                      <p className="text-gray-600 text-sm">
                        Pesquise sobre o local do evento e tenha um plano de como chegar e sair
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                {isClient && (
                  <div className="relative">
                    <img 
                      src="img/seguranca-eventos.png"
                      alt="Dicas de segurança para eventos e caronas em São Luís" 
                      className="w-full h-auto rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
              <Calendar className="w-4 h-4" />
              <span>Atualizado automaticamente</span>
            </div>
          </div>
        </div>
      </header>

      {/* Filtros Melhorados */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-3 px-5 py-2.5 rounded-full font-semibold transition-all border-2 ${
                  selectedCategory === category.id
                    ? 'bg-[#004d2b] text-white border-[#004d2b] shadow-lg'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#004d2b] hover:text-[#004d2b]'
                }`}
              >
                <span className="text-sm">{category.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full min-w-6 ${
                  selectedCategory === category.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Eventos */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#004d2b] mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Buscando eventos em São Luís...</p>
              <p className="text-gray-500 text-sm mt-2">Usando Eventbrite API</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map(event => (
                  <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 group">
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={`absolute top-4 right-4 ${
                        event.type === 'gratuito' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-yellow-500 text-gray-800'
                      } px-3 py-1 rounded-full font-bold text-sm shadow-lg`}>
                        {event.type === 'gratuito' ? '🎉 GRÁTIS' : '💸 PAGO'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        {event.participants} pessoas
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm">
                            {formatEventDate(event.date, event.time)}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-gray-500">
                          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-tight">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <DollarSign className="w-4 h-4" />
                          <span className={`text-sm font-semibold ${
                            event.type === 'gratuito' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {event.price}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handlePedirCorrida(event)}
                          className="flex-1 bg-[#004d2b] hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center flex items-center justify-center gap-2 text-sm"
                        >
                          <Map className="w-4 h-4" />
                          Pedir Corrida
                        </button>
                        <button className="bg-green-100 hover:bg-green-200 text-[#004d2b] p-3 rounded-lg transition-colors">
                          <Users className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-16">
                  <Music className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                    Nenhum evento encontrado
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Não encontramos eventos para os filtros selecionados. Tente alterar as categorias ou verifique novamente mais tarde.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}