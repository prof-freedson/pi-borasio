'use client';

import { ChevronLeft, Map, Shield, Clock, Users, Anchor, Umbrella, ShoppingCart, Calendar, Film, Theater, Star, Navigation } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Beach = {
  id: number;
  name: string;
  description: string;
  rating: number;
  bestTime: string;
  parking: string;
  facilities: string[];
};

type Cinema = {
  id: number;
  name: string;
  location: string;
  movies: string[];
  parking: string;
  hours: string;
};

type Theater = {
  id: number;
  name: string;
  location: string;
  currentShows: string[];
  capacity: string;
  parking: string;
};

type Market = {
  id: number;
  name: string;
  location: string;
  bestTime: string;
  days: string;
  products: string[];
  parking: string;
};

export default function ModoIlhaPage() {
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar dados das praias
  const fetchBeaches = async () => {
    try {
      const mockBeaches = [
        {
          id: 1,
          name: "Praia do Calhau",
          description: "Uma das praias mais movimentadas de São Luís",
          rating: 4.5,
          bestTime: "Manhã",
          parking: "Pago",
          facilities: ["Quiosques", "Banheiros", "Estacionamento"]
        },
        {
          id: 2,
          name: "Praia de Olho d'Água",
          description: "Praia familiar com boa infraestrutura",
          rating: 4.3,
          bestTime: "Tarde",
          parking: "Gratuito",
          facilities: ["Quiosques", "Área infantil", "Voleibol"]
        },
        {
          id: 3,
          name: "Praia do Araçagy",
          description: "Ideal para esportes aquáticos",
          rating: 4.2,
          bestTime: "Fim de tarde",
          parking: "Gratuito após 14h",
          facilities: ["Surf", "Caminhada", "Restaurantes"]
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
          name: "Cinema do São Luís Shopping",
          location: "São Luís Shopping",
          movies: ["Lançamentos", "Infantil", "Nacional"],
          parking: "P3 - Gratuito por 3h",
          hours: "14h às 23h"
        },
        {
          id: 2,
          name: "Cinema do Tropical Shopping",
          location: "Tropical Shopping",
          movies: ["Lançamentos", "3D", "Sessão meia"],
          parking: "Subsolo - R$ 5,00",
          hours: "13h às 22h"
        },
        {
          id: 3,
          name: "Cine Praia Grande",
          location: "Centro Histórico",
          movies: ["Arte", "Cult", "Independente"],
          parking: "Largo do Comércio",
          hours: "16h às 21h"
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
          name: "Teatro Arthur Azevedo",
          location: "Centro Histórico",
          currentShows: ["Peças clássicas", "Música regional"],
          capacity: "400 lugares",
          parking: "Rua do Egito"
        },
        {
          id: 2,
          name: "Teatro Alcione Nazaré",
          location: "Cohafuma",
          currentShows: ["Comédias", "Shows locais"],
          capacity: "250 lugares",
          parking: "Próprio - Gratuito"
        },
        {
          id: 3,
          name: "Teatro da Cidade de São Luís",
          location: "Olho d'Água",
          currentShows: ["Dança", "Teatro experimental"],
          capacity: "300 lugares",
          parking: "Shopping da Cidade"
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
          name: "Feira do Tirirical",
          location: "Tirirical",
          bestTime: "Antes das 8h",
          days: "Terça, Quinta, Sábado",
          products: ["Hortifruti", "Carnes", "Grãos"],
          parking: "Rua Principal"
        },
        {
          id: 2,
          name: "Feira da Cohab",
          location: "Cohab Anil",
          bestTime: "Manhã",
          days: "Segunda, Quarta, Sexta",
          products: ["Verduras", "Peixes", "Temperos"],
          parking: "Rua 7"
        },
        {
          id: 3,
          name: "Feira da Cohama",
          location: "Cohama",
          bestTime: "Tarde",
          days: "Todos os dias",
          products: ["Frutas", "Artigos Domésticos", "Roupas"],
          parking: "Evite às segundas"
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

  // Função para pedir corrida
  const pedirCorrida = (destination = '') => {
    if (destination) {
      window.location.href = `/corridas?destination=${encodeURIComponent(destination)}`;
    } else {
      window.location.href = '/corridas';
    }
  };

  const features = [
    {
      icon: <Map className="w-8 h-8 text-[#004d2b]" />,
      title: "Rotas Inteligentes",
      description: "Conexões entre bairros considerando pontes e avenidas principais"
    },
    {
      icon: <Umbrella className="w-8 h-8 text-[#004d2b]" />,
      title: "Acesso às Praias",
      description: "Rotas para Calhau, Olho d'Água e Araçagy com alertas de trânsito na Litorânea"
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-[#004d2b]" />,
      title: "Feiras Livres",
      description: "Trajetos otimizados para Tirirical, Cohab e outras feiras da região"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#004d2b]" />,
      title: "Segurança",
      description: "Rotas por vias movimentadas e bem iluminadas"
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
            Modo Ilha
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#004d2b] to-green-700 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Conectando São Luís como só o nativo conhece
            </h2>
            <p className="text-lg sm:text-xl mb-6">
              Rotas que entendem a ilha: das praias às feiras livres, passando pelos atalhos que só o maranhense sabe.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => pedirCorrida()}
                className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
              >
                Pedir Corrida
              </button>
              <Link 
                href="/corrida-em-grupo" 
                className="bg-white/10 hover:bg-white/20 font-semibold py-3 px-6 rounded-lg transition-colors border border-white"
              >
                Usar com Carona em Grupo
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://www.google.com/maps/vt/data=GNl3uTUjV2a2T_vMJfKvMkIGPKKiiCAReeCdVnwV4vPsQrMPR8Wqe71JNJ51BEt3dT8mZwUZkh_QYz5CZAt-qes-gIGzZjTEiKJH7l9Zy7wvdSo3mFNBa7QmY7Yc_s2khFHxh7HTI4t0V5wYX0h9EE86UZcYccYIPv3SOISF1QAjJVRtCK4hUb4jAYJE5RWxlwP0NLJaOISyTqzrbZQ9CT0Vg8eaWkvFzhxPyLFnj7so_fR12_KG2MIcJJ0RBMOtrVWgkwygnD1TjiW2L-Hfu67g6tOm2QI1" 
              alt="Mapa de São Luís com rotas estratégicas" 
              className="w-full max-w-[300px] md:max-w-[350px] rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#004d2b] mb-12">
            Navegue como quem conhece
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-green-50 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <div className="mb-4 p-3 bg-white rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#004d2b] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Praias Section com API */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#004d2b] flex items-center gap-3">
              <Umbrella className="w-8 h-8" />
              Praias de São Luís
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004d2b] mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando praias...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beaches.map((beach) => (
                <div key={beach.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-[#004d2b]">{beach.name}</h3>
                      <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold">{beach.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{beach.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Melhor horário:</span>
                        <span className="font-semibold">{beach.bestTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Estacionamento:</span>
                        <span className="font-semibold">{beach.parking}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {beach.facilities.map((facility, index) => (
                        <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {facility}
                        </span>
                      ))}
                    </div>

                    <button 
                      onClick={() => pedirCorrida(beach.name)}
                      className="w-full bg-[#004d2b] text-white py-2 rounded-lg hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      Pedir Corrida
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feiras Section com API */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#004d2b] flex items-center gap-3">
              <ShoppingCart className="w-8 h-8" />
              Feiras Livres
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004d2b] mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando feiras...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {markets.map((market) => (
                <div key={market.id} className="bg-green-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-[#004d2b] mb-2">{market.name}</h3>
                  <p className="text-gray-600 mb-3">{market.location}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Melhor horário:</span>
                      <span className="font-semibold">{market.bestTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Dias:</span>
                      <span className="font-semibold">{market.days}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Estacionamento:</span>
                      <span className="font-semibold">{market.parking}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {market.products.map((product, index) => (
                      <span key={index} className="bg-white text-[#004d2b] text-xs px-2 py-1 rounded border">
                        {product}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => pedirCorrida(market.name)}
                    className="w-full bg-[#004d2b] text-white py-2 rounded-lg hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Pedir Corrida
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cinema e Teatro Section com API */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#004d2b] flex items-center gap-3">
              <Film className="w-8 h-8" />
              Cinemas e Teatros
            </h2>
          </div>

          {/* Cinemas */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-6 flex items-center gap-2">
              <Film className="w-6 h-6" />
              Cinemas
            </h3>
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#004d2b] mx-auto"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cinemas.map((cinema) => (
                  <div key={cinema.id} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="text-lg font-bold text-[#004d2b] mb-2">{cinema.name}</h4>
                    <p className="text-gray-600 mb-3">{cinema.location}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Horário:</span>
                        <span className="font-semibold">{cinema.hours}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Estacionamento:</span>
                        <span className="font-semibold">{cinema.parking}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {cinema.movies.map((movie, index) => (
                        <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {movie}
                        </span>
                      ))}
                    </div>

                    <button 
                      onClick={() => pedirCorrida(cinema.name)}
                      className="w-full bg-[#004d2b] text-white py-2 rounded-lg hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      Pedir Corrida
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Teatros */}
          <div>
            <h3 className="text-2xl font-bold text-[#004d2b] mb-6 flex items-center gap-2">
              <Theater className="w-6 h-6" />
              Teatros
            </h3>
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#004d2b] mx-auto"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {theaters.map((theater) => (
                  <div key={theater.id} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="text-lg font-bold text-[#004d2b] mb-2">{theater.name}</h4>
                    <p className="text-gray-600 mb-3">{theater.location}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Capacidade:</span>
                        <span className="font-semibold">{theater.capacity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Estacionamento:</span>
                        <span className="font-semibold">{theater.parking}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {theater.currentShows.map((show, index) => (
                        <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {show}
                        </span>
                      ))}
                    </div>

                    <button 
                      onClick={() => pedirCorrida(theater.name)}
                      className="w-full bg-[#004d2b] text-white py-2 rounded-lg hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      Pedir Corrida
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section - Download do App */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#004d2b] to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Baixe o App e Viva São Luís sem trânsito!
          </h2>
          <p className="text-xl mb-8">
            Tenha todas as rotas inteligentes na palma da sua mão.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/download"
              className="bg-yellow-400 hover:bg-yellow-300 text-[#004d2b] font-semibold py-3 px-8 rounded-lg transition-colors shadow-md text-lg"
            >
              Baixar Aplicativo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}