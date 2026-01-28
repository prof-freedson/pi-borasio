import { useState, useEffect } from 'react';

interface Beach {
  id: number;
  rideId: number;
  name: string;
  description: string;
  rating: number;
  bestTime: string;
  parking: string;
  facilities: string[];
}

interface Cinema {
  id: number;
  rideId: number;
  name: string;
  location: string;
  movies: string[];
  parking: string;
  hours: string;
}

interface Theater {
  id: number;
  rideId: number;
  name: string;
  location: string;
  currentShows: string[];
  capacity: string;
  parking: string;
}

interface Market {
  id: number;
  rideId: number;
  name: string;
  location: string;
  bestTime: string;
  days: string;
  products: string[];
  parking: string;
}

export function useModoIlhaData() {
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBeaches = async () => {
    try {
      const mockBeaches: Beach[] = [
        {
          id: 1,
          rideId: 4,
          name: "Praia do Calhau",
          description: "Uma das praias mais movimentadas de São Luís",
          rating: 4.5,
          bestTime: "Manhã",
          parking: "Pago",
          facilities: ["Quiosques", "Banheiros", "Estacionamento"]
        },
        {
          id: 2,
          rideId: 5,
          name: "Praia de Olho d'Água",
          description: "Praia familiar com boa infraestrutura",
          rating: 4.3,
          bestTime: "Tarde",
          parking: "Gratuito",
          facilities: ["Quiosques", "Área infantil", "Voleibol"]
        },
        {
          id: 3,
          rideId: 6,
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

  const fetchCinemas = async () => {
    try {
      const mockCinemas: Cinema[] = [
        {
          id: 1,
          rideId: 23,
          name: "Cinema do São Luís Shopping",
          location: "São Luís Shopping",
          movies: ["Lançamentos", "Infantil", "Nacional"],
          parking: "P3 - Gratuito por 3h",
          hours: "14h às 23h"
        },
        {
          id: 2,
          rideId: 26,
          name: "Cinema do Tropical Shopping",
          location: "Tropical Shopping",
          movies: ["Lançamentos", "3D", "Sessão meia"],
          parking: "Subsolo - R$ 5,00",
          hours: "13h às 22h"
        },
        {
          id: 3,
          rideId: 27,
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

  const fetchTheaters = async () => {
    try {
      const mockTheaters: Theater[] = [
        {
          id: 1,
          rideId: 24,
          name: "Teatro Arthur Azevedo",
          location: "Centro Histórico",
          currentShows: ["Peças clássicas", "Música regional"],
          capacity: "400 lugares",
          parking: "Rua do Egito"
        },
        {
          id: 2,
          rideId: 28,
          name: "Teatro Alcione Nazaré",
          location: "Cohafuma",
          currentShows: ["Comédias", "Shows locais"],
          capacity: "250 lugares",
          parking: "Próprio - Gratuito"
        },
        {
          id: 3,
          rideId: 29,
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

  const fetchMarkets = async () => {
    try {
      const mockMarkets: Market[] = [
        {
          id: 1,
          rideId: 21,
          name: "Feira do Tirirical",
          location: "Tirirical",
          bestTime: "Antes das 8h",
          days: "Terça, Quinta, Sábado",
          products: ["Hortifruti", "Carnes", "Grãos"],
          parking: "Rua Principal"
        },
        {
          id: 2,
          rideId: 22,
          name: "Feira da Cohab",
          location: "Cohab Anil",
          bestTime: "Manhã",
          days: "Segunda, Quarta, Sexta",
          products: ["Verduras", "Peixes", "Temperos"],
          parking: "Rua 7"
        },
        {
          id: 3,
          rideId: 25,
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

  return { beaches, cinemas, theaters, markets, loading };
}
