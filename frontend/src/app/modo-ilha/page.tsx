'use client';

import {
  ChevronLeft,
  Map,
  Shield,
  Clock,
  Users,
  Anchor,
  Umbrella,
  ShoppingCart,
  Calendar,
  Film,
  Theater as TheaterIcon,
  Star,
  Navigation,
  Info,
  Layers,
  MapPin
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Beach = {
  id: number;
  rideId: number;
  name: string;
  description: string;
  rating: number;
  bestTime: string;
  parking: string;
  facilities: string[];
  image?: string;
};

type Cinema = {
  id: number;
  rideId: number;
  name: string;
  location: string;
  movies: string[];
  parking: string;
  hours: string;
  image?: string;
};

type Theater = {
  id: number;
  rideId: number;
  name: string;
  location: string;
  currentShows: string[];
  capacity: string;
  parking: string;
  image?: string;
};

type Market = {
  id: number;
  rideId: number;
  name: string;
  location: string;
  bestTime: string;
  days: string;
  products: string[];
  parking: string;
  image?: string;
};

type TabType = 'praias' | 'feiras' | 'cultura' | 'info';

export default function ModoIlhaPage() {
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('praias');

  // Função para buscar dados das praias
  const fetchBeaches = async () => {
    try {
      const mockBeaches = [
        {
          id: 1,
          rideId: 4,
          name: "Praia do Calhau",
          description: "A mais icônica de São Luís, com calçadão vibrante e ótimos quiosques para o pôr do sol.",
          rating: 4.8,
          bestTime: "Fim de tarde",
          parking: "Zona Azul / Privado",
          facilities: ["Calçadão", "Quiosques", "Segurança", "Wi-Fi Público"],
          image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: 2,
          rideId: 5,
          name: "Praia de Olho d'Água",
          description: "Ambiente familiar com falésias impressionantes e ventos ideais para esportes à vela.",
          rating: 4.6,
          bestTime: "Manhã",
          parking: "Gratuito nas vias",
          facilities: ["Área Kids", "Volei de Praia", "Restaurantes"],
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: 3,
          rideId: 6,
          name: "Praia do Araçagy",
          description: "Onde os carros encontram o mar. Perfeita para quem busca liberdade e espaço.",
          rating: 4.5,
          bestTime: "Todo o dia",
          parking: "Na areia (maré baixa)",
          facilities: ["Surf", "Kitesurf", "Peixe Frito"],
          image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800"
        }
      ];
      setBeaches(mockBeaches);
    } catch (error) {
      console.error('Erro ao buscar praias:', error);
    }
  };

  // Função para buscar cinemas
  const fetchCinemas = async () => {
    try {
      const mockCinemas = [
        {
          id: 1,
          rideId: 23,
          name: "Cinépolis São Luís Shopping",
          location: "Jaracaty",
          movies: ["Lançamentos", "Sala VIP", "Macro XE"],
          parking: "Shopping",
          hours: "13:00 - 22:30",
          image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: 2,
          rideId: 26,
          name: "Centerplex Tropical",
          location: "Renascença",
          movies: ["Mainstream", "Promoções Semanais"],
          parking: "Subsolo Pago",
          hours: "14:00 - 22:00",
          image: "https://images.unsplash.com/photo-1517604401157-538a9663ec40?auto=format&fit=crop&q=80&w=800"
        }
      ];
      setCinemas(mockCinemas);
    } catch (error) {
      console.error('Erro ao buscar cinemas:', error);
    }
  };

  // Função para buscar teatros
  const fetchTheaters = async () => {
    try {
      const mockTheaters = [
        {
          id: 1,
          rideId: 24,
          name: "Teatro Arthur Azevedo",
          location: "Rua do Sol, Centro Histórico",
          currentShows: ["Ópera", "Ballet", "Peças Nacionais"],
          capacity: "750 lugares",
          parking: "Entorno do Centro",
          image: "https://images.unsplash.com/photo-1503095396549-807a89010046?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: 2,
          rideId: 28,
          name: "Teatro Alcione Nazaré",
          location: "Praia Grande",
          currentShows: ["Stand-up", "Música Regional"],
          capacity: "350 lugares",
          parking: "Terminal Praia Grande",
          image: "https://images.unsplash.com/photo-1514302240736-b1fee5985889?auto=format&fit=crop&q=80&w=800"
        }
      ];
      setTheaters(mockTheaters);
    } catch (error) {
      console.error('Erro ao buscar teatros:', error);
    }
  };

  // Função para buscar feiras
  const fetchMarkets = async () => {
    try {
      const mockMarkets = [
        {
          id: 1,
          rideId: 21,
          name: "Feira do Tirirical",
          location: "Av. Guajajaras",
          bestTime: "Sábado de Manhã",
          days: "Diariamente",
          products: ["Juçara", "Temperos", "Artesanato"],
          parking: "Vias Laterais",
          image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: 2,
          rideId: 22,
          name: "Feira da Cohab",
          location: "Próximo ao Terminal",
          bestTime: "Domingo 07h",
          days: "Terça a Domingo",
          products: ["Peixe Fresco", "Goma", "Farinha"],
          parking: "Pátio Interno",
          image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=800"
        }
      ];
      setMarkets(mockMarkets);
    } catch (error) {
      console.error('Erro ao buscar feiras:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchBeaches(),
        fetchCinemas(),
        fetchTheaters(),
        fetchMarkets()
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  const pedirCorrida = (rideId?: number) => {
    if (rideId) {
      window.location.href = `/corridas?tipo=ilha&rideId=${rideId}`;
    } else {
      window.location.href = '/corridas?tipo=ilha';
    }
  };

  const features = [
    {
      icon: <Layers className="w-6 h-6 text-yellow-500" />,
      title: "Contexto Local",
      description: "Conhecemos todos os 'furos' e atalhos da Ilha."
    },
    {
      icon: <Clock className="w-6 h-6 text-yellow-500" />,
      title: "Tempo Real",
      description: "Alertas sobre maré e trânsito na Litorânea."
    },
    {
      icon: <Users className="w-6 h-6 text-yellow-500" />,
      title: "Comunidade",
      description: "Motoristas nativos que amam a cidade."
    }
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[450px] flex items-center justify-center overflow-hidden bg-[#004d2b]">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src="https://images.unsplash.com/photo-1582266255745-4e1e023773e3?auto=format&fit=crop&q=80&w=1200"
              alt="São Luís"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container mx-auto px-4 relative z-20 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-[#004d2b] px-4 py-1.5 rounded-full text-sm font-bold mb-6 shadow-lg">
                <MapPin className="w-4 h-4" />
                EXCLUSIVO SÃO LUÍS
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight drop-shadow-md">
                Modo Ilha: <br />
                <span className="text-yellow-400">Na batida do reggae.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white mb-10 leading-relaxed font-medium drop-shadow-sm">
                Navegue com a inteligência de quem nasceu aqui. <br className="hidden md:block" /> Das praias ao Centro Histórico.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => pedirCorrida()}
                  className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-black py-5 px-12 rounded-2xl transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3 text-lg"
                >
                  <Navigation className="w-6 h-6 fill-current" />
                  PEDIR CORRIDA AGORA
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Info Cards / Features - MOVED BELOW HERO WITHOUT OVERLAP */}
        <section className="py-12 bg-green-50 border-b border-green-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4 border border-green-100 hover:shadow-md transition-shadow">
                  <div className="bg-green-50 p-3 rounded-xl">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#004d2b]">{f.title}</h3>
                    <p className="text-sm text-gray-500">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Navigation Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#004d2b] mb-4">Explore a Ilha do Amor</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Selecione uma categoria para descobrir os melhores destinos e peça seu Bora Siô com facilidade.
              </p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-12 p-1 bg-green-50 rounded-2xl max-w-2xl mx-auto border border-green-100">
              <button
                onClick={() => setActiveTab('praias')}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all ${activeTab === 'praias' ? 'bg-[#004d2b] text-white shadow-md' : 'text-[#004d2b] hover:bg-green-100'
                  }`}
              >
                <Umbrella className="w-5 h-5" />
                Praias
              </button>
              <button
                onClick={() => setActiveTab('feiras')}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all ${activeTab === 'feiras' ? 'bg-[#004d2b] text-white shadow-md' : 'text-[#004d2b] hover:bg-green-100'
                  }`}
              >
                <ShoppingCart className="w-5 h-5" />
                Feiras
              </button>
              <button
                onClick={() => setActiveTab('cultura')}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all ${activeTab === 'cultura' ? 'bg-[#004d2b] text-white shadow-md' : 'text-[#004d2b] hover:bg-green-100'
                  }`}
              >
                <TheaterIcon className="w-5 h-5" />
                Cultura
              </button>
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all ${activeTab === 'info' ? 'bg-[#004d2b] text-white shadow-md' : 'text-[#004d2b] hover:bg-green-100'
                  }`}
              >
                <Info className="w-5 h-5" />
                Dicas
              </button>
            </div>

            {/* Tab Content */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-yellow-400 border-t-[#004d2b] rounded-full animate-spin"></div>
                <p className="mt-4 font-medium text-[#004d2b]">Preparando rotas...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeTab === 'praias' && beaches.map(beach => (
                  <div key={beach.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col">
                    <div className="relative h-56 bg-green-100">
                      <img
                        src={beach.image}
                        alt={beach.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop";
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-bold text-[#004d2b]">{beach.rating}</span>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-[#004d2b] mb-2">{beach.name}</h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{beach.description}</p>
                      <div className="space-y-2 mb-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-yellow-500" />
                          <span className="text-gray-600">Melhor horário: <strong>{beach.bestTime}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-yellow-500" />
                          <span className="text-gray-600">Vagas: <strong>{beach.parking}</strong></span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {beach.facilities.map((f, idx) => (
                          <span key={idx} className="bg-green-50 text-[#004d2b] text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded">
                            {f}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => pedirCorrida(beach.rideId)}
                        className="mt-auto w-full bg-[#004d2b] text-white font-bold py-3 rounded-xl hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-4 h-4" />
                        Ir para {beach.name.split(' ').pop()}
                      </button>
                    </div>
                  </div>
                ))}

                {activeTab === 'feiras' && markets.map(market => (
                  <div key={market.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col">
                    <div className="relative h-48 bg-green-50">
                      <img
                        src={market.image}
                        alt={market.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1488459715fb8-d33920935c71?q=80&w=800&auto=format&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{market.name}</h3>
                        <p className="text-xs opacity-90 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {market.location}
                        </p>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-green-50 p-3 rounded-xl">
                          <p className="text-[10px] text-gray-400 uppercase font-black mb-1 text-center">Melhor Dia</p>
                          <p className="text-xs font-bold text-[#004d2b] text-center">{market.bestTime}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-xl">
                          <p className="text-[10px] text-gray-400 uppercase font-black mb-1 text-center">Freq.</p>
                          <p className="text-xs font-bold text-[#004d2b] text-center">{market.days}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-6">
                        {market.products.map((p, i) => (
                          <span key={i} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{p}</span>
                        ))}
                      </div>
                      <button
                        onClick={() => pedirCorrida(market.rideId)}
                        className="mt-auto w-full bg-[#004d2b] text-white font-bold py-3 rounded-xl hover:bg-green-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        Pedir Corrida
                      </button>
                    </div>
                  </div>
                ))}

                {activeTab === 'cultura' && [...cinemas, ...theaters].map((item, idx) => (
                  <div key={idx} className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col">
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={'image' in item ? item.image : undefined}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop";
                        }}
                      />
                      <div className="absolute top-4 left-4 bg-yellow-400 text-[#004d2b] text-[10px] font-black uppercase px-2 py-1 rounded">
                        {'movies' in item ? 'Cinema' : 'Teatro'}
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-[#004d2b] mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {('movies' in item ? item.movies : item.currentShows).map((tag, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <button
                        onClick={() => pedirCorrida(item.rideId)}
                        className="mt-auto w-full border-2 border-[#004d2b] text-[#004d2b] font-bold py-3 rounded-xl hover:bg-[#004d2b] hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        Ver no Mapa
                      </button>
                    </div>
                  </div>
                ))}

                {activeTab === 'info' && (
                  <div className="col-span-full bg-[#004d2b] text-white p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                      <div className="md:w-1/2">
                        <h3 className="text-3xl font-bold mb-6">A Inteligência da Ilha</h3>
                        <p className="text-green-100 mb-8 leading-relaxed">
                          Diferente de apps globais, o Bora Siô entende as nuances de São Luís. Consideramos marés, horários de pico nas pontes e o movimento dos terminais.
                        </p>
                        <div className="space-y-4">
                          {[
                            "Trajetos otimizados via pontes principais",
                            "Monitoramento da maré na Litorânea",
                            "Rotas exclusivas em dias de eventos culturais"
                          ].map((text, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                              <span className="text-sm font-medium">{text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="md:w-1/2">
                        <div className="bg-white/10 p-2 rounded-3xl border border-white/20 backdrop-blur-md">
                          <img
                            src="https://www.google.com/maps/vt/data=GNl3uTUjV2a2T_vMJfKvMkIGPKKiiCAReeCdVnwV4vPsQrMPR8Wqe71JNJ51BEt3dT8mZwUZkh_QYz5CZAt-qes-gIGzZjTEiKJH7l9Zy7wvdSo3mFNBa7QmY7Yc_s2khFHxh7HTI4t0V5wYX0h9EE86UZcYccYIPv3SOISF1QAjJVRtCK4hUb4jAYJE5RWxlwP0NLJaOISyTqzrbZQ9CT0Vg8eaWkvFzhxPyLFnj7so_fR12_KG2MIcJJ0RBMOtrVWgkwygnD1TjiW2L-Hfu67g6tOm2QI1"
                            alt="Mapa Inteligente"
                            className="rounded-2xl w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-green-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black text-[#004d2b] mb-6">
              Vá além do básico.
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Economize tempo e curta São Luís como se estivesse sempre no atalho certo.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/download"
                className="bg-[#004d2b] hover:bg-green-800 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-lg text-lg"
              >
                BAIXAR APP AGORA
              </Link>
              <Link
                href="/corrida-em-grupo"
                className="bg-white hover:bg-gray-100 text-[#004d2b] border-2 border-[#004d2b] font-black py-5 px-10 rounded-2xl transition-all shadow-md text-lg"
              >
                CORRIDA EM GRUPO
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
