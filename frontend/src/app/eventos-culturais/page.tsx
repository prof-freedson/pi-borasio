'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, DollarSign, Music, Star, ExternalLink, Shield, CheckCircle, Eye, Users as UsersIcon, Map, Sparkles, Navigation, Info } from 'lucide-react';
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
    <div className="min-h-screen bg-[#f8faf8] font-sans selection:bg-yellow-400 selection:text-[#004d2b]">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section - Premium Immersive */}
      <header className="relative pt-24 pb-32 px-6 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-green-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#004d2b]">A Ilha do Amor te espera</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[#004d2b] tracking-tight leading-[0.95] max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Cultura em <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-600">Movimento</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1200">
              Explore o vibrante cenário cultural de São Luís. Dos tambores aos palcos, encontre sua próxima experiência inesquecível.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-16 duration-1400">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-[#004d2b] leading-tight">+2.4k pessoas</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Já usaram carona para eventos hoje</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Categories / Filters - Sticky Glassmorphism */}
      <nav className="sticky top-0 z-[50] py-6 px-4 backdrop-blur-xl bg-white/70 border-b border-green-50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative flex items-center gap-3 px-6 py-3 rounded-2xl font-black transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#004d2b] text-white shadow-xl shadow-green-900/20'
                    : 'bg-white text-gray-400 hover:text-[#004d2b] hover:bg-green-50/50 border border-gray-100'
                }`}
              >
                <span className="text-xs uppercase tracking-widest">{category.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-md transition-colors ${
                  selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-green-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#004d2b] border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#004d2b] animate-pulse">Sincronizando Cultura...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredEvents.map(event => (
                <div 
                  key={event.id} 
                  className="group bg-white rounded-[2.5rem] shadow-xl shadow-green-900/5 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500 border border-gray-50 overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute top-6 right-6">
                      <div className={`px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-widest backdrop-blur-md shadow-lg ${
                        event.type === 'gratuito' 
                          ? 'bg-green-500/90 text-white' 
                          : 'bg-yellow-400/90 text-[#004d2b]'
                      }`}>
                        {event.type === 'gratuito' ? 'Gratuito' : (event.price === 'Pago' ? 'Pago' : 'A partir de ' + event.price)}
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 flex items-center gap-2">
                       <div className="bg-white/20 backdrop-blur-md p-1.5 rounded-full border border-white/30">
                          <Users className="w-3 h-3 text-white" />
                       </div>
                       <span className="text-[10px] font-black text-white uppercase tracking-widest">{event.participants} Confirmados</span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-4">
                       <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[9px] font-black uppercase tracking-widest rounded-lg">
                          {event.category}
                       </span>
                       <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                       <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                          {formatEventDate(event.date, event.time)}
                       </span>
                    </div>

                    <h3 className="text-2xl font-black text-[#004d2b] mb-4 tracking-tight leading-tight group-hover:text-green-700 transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-sm font-medium text-gray-500 mb-8 line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                    
                    <div className="mt-auto space-y-6">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-3xl border border-gray-100 group/loc transition-colors hover:bg-white hover:border-green-200">
                        <div className="bg-white p-2 rounded-xl shadow-sm group-hover/loc:bg-[#004d2b] group-hover/loc:text-white transition-all">
                          <MapPin className="w-4 h-4 text-[#004d2b] group-hover/loc:text-white" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Localização</p>
                          <p className="text-xs font-black text-[#004d2b] truncate uppercase">{event.location}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handlePedirCorrida(event)}
                        className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-black py-4 rounded-2xl shadow-lg shadow-yellow-400/20 active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3 overflow-hidden group/btn"
                      >
                        <Navigation className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        Pedir Corrida
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredEvents.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[4rem] shadow-xl border border-gray-50 max-w-2xl mx-auto">
              <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
                <Music className="w-10 h-10 text-green-700 opacity-40" />
              </div>
              <h3 className="text-2xl font-black text-[#004d2b] mb-4 uppercase tracking-tighter">Silêncio na Pista</h3>
              <p className="text-gray-400 font-medium px-12">
                Nenhum evento encontrado nesta categoria. Que tal explorar outras vibrações?
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Security & Experience Section - Premium Redesign */}
      <section className="py-32 px-6 bg-[#004d2b] relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yellow-400/10 rounded-full blur-[150px] -mr-[400px] -mt-[400px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="bg-yellow-400 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-400/20">
                   <Shield className="w-8 h-8 text-[#004d2b]" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                  Sua segurança é o nosso <span className="text-yellow-400">melhor espetáculo</span>
                </h2>
                <p className="text-lg text-green-100/60 font-medium leading-relaxed">
                  Não importa se o show é grátis ou VIP, sua integridade é prioridade. Siga nossas diretrizes para uma experiência impecável.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: <CheckCircle className="text-green-400" />, title: "Check do Carro", desc: "Confira placa e modelo no app." },
                  { icon: <Eye className="text-blue-400" />, title: "Em Tempo Real", desc: "Compartilhe sua rota ativa." },
                  { icon: <UsersIcon className="text-purple-400" />, title: "Vá em Grupo", desc: "Prefira caronas com mais pessoas." },
                  { icon: <Map className="text-orange-400" />, title: "Ponto Seguro", desc: "Escolha locais bem iluminados." }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="bg-white/10 p-2 rounded-xl">
                        {item.icon}
                      </div>
                      <h4 className="font-black text-white text-sm uppercase tracking-widest">{item.title}</h4>
                    </div>
                    <p className="text-xs text-green-100/40 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-yellow-400/20 rounded-[3rem] blur-3xl group-hover:bg-yellow-400/30 transition-all duration-700"></div>
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=800&h=1000&fit=crop"
                  alt="Segurança em Eventos" 
                  className="w-full h-auto transform transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004d2b] via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20">
                   <div className="flex items-center gap-4">
                      <div className="bg-green-500 w-3 h-3 rounded-full animate-ping"></div>
                      <p className="text-white font-black text-sm uppercase tracking-[0.2em]">Monitoramento Ativo 24/7</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info Pill */}
      <footer className="py-12 px-6 flex justify-center">
         <div className="bg-white px-8 py-4 rounded-full shadow-lg border border-gray-100 flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-full">
               <Calendar className="w-4 h-4 text-[#004d2b]" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
               Eventos sincronizados com <span className="text-[#004d2b]">Eventbrite Cloud</span>
            </p>
         </div>
      </footer>
    </div>

  );
}