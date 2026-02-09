"use client"

import { MapPin, Users, ArrowRight, Clock, Star, Navigation, Calendar, Trees, Car, Share2, ChevronLeft, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { useState, useEffect } from "react";

type Corrida = {
  id: number;
  origem: string;
  destino: string;
  assentos: number;
  preco: string;
  motorista: string;
  avaliacao: number;
  tempoEstimado: string;
  veiculo: string;
  tipo: 'geral' | 'ilha' | 'evento' | 'rural' | 'grupo';
  horario?: string;
  data?: string;
  economia?: string;
  pessoas?: number;
};

// Função para carregar corridas do localStorage
const getCorridasDoLocalStorage = (): Corrida[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const corridasSalvas = localStorage.getItem('corridasOferecidas');
    return corridasSalvas ? JSON.parse(corridasSalvas) : [];
  } catch (error) {
    console.error('Erro ao carregar corridas do localStorage:', error);
    return [];
  }
};

export default function CorridasPage() {
  const router = useRouter();
  const [abaAtiva, setAbaAtiva] = useState<'geral' | 'ilha' | 'evento' | 'rural' | 'grupo'>('geral');
  const [destinoEsperado] = useState("UFMA");
  const [corridasLocais, setCorridasLocais] = useState<Corrida[]>([]);
  const [filtroDestinoEvento, setFiltroDestinoEvento] = useState<string | null>(null);
  const [filtroRideId, setFiltroRideId] = useState<string | null>(null);
  const [selectedCorridaId, setSelectedCorridaId] = useState<number | null>(null);

  // Carregar corridas do localStorage quando o componente montar
  useEffect(() => {
    setCorridasLocais(getCorridasDoLocalStorage());
  }, []);

  // Verificar parâmetros da URL para definir a aba e filtros
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo');
    const group = urlParams.get('group');
    const eventoLocal = urlParams.get('local');
    const rideId = urlParams.get('rideId');

    if (rideId) {
      setAbaAtiva('ilha');
      setFiltroRideId(rideId);
      const idNum = Number(rideId);
      if (!Number.isNaN(idNum)) {
        setSelectedCorridaId(idNum);
        // depois de montar a lista, vamos rolar até a corrida selecionada
        setTimeout(() => {
          const el = document.getElementById(`corrida-${idNum}`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 700);
      }
    } else if (tipo === 'rural') {
      setAbaAtiva('rural');
    } else if (tipo === 'ilha') {
      setAbaAtiva('ilha');
    } else if (eventoLocal) {
      setAbaAtiva('evento');
      if (eventoLocal) setFiltroDestinoEvento(eventoLocal);
    } else if (group === 'true') {
      setAbaAtiva('grupo');
    }
    
    // Scroll para as corridas
    setTimeout(() => {
      const element = document.getElementById('corridas-list');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }, []);

  const corridasPreDefinidas: Corrida[] = [
    {
      id: 1,
      origem: "Terminal Cohama",
      destino: "UFMA",
      assentos: 3,
      preco: "R$ 8,50",
      motorista: "Carlos Silva",
      avaliacao: 4.8,
      tempoEstimado: "15 min",
      veiculo: "HB20 Prata - ABC1D23",
      tipo: 'geral'
    },
    {
      id: 2,
      origem: "Monte Castelo",
      destino: "Shopping da Ilha",
      assentos: 2,
      preco: "R$ 12,00",
      motorista: "Ana Santos",
      avaliacao: 4.9,
      tempoEstimado: "20 min",
      veiculo: "Onix Preto - XYZ4E56",
      tipo: 'geral'
    },
    {
      id: 3,
      origem: "Renascença",
      destino: "Calhau",
      assentos: 1,
      preco: "R$ 15,00",
      motorista: "João Oliveira",
      avaliacao: 4.7,
      tempoEstimado: "25 min",
      veiculo: "Gol Branco - DEF7G89",
      tipo: 'geral'
    },
    // Corridas do Modo Ilha atualizadas
    {
      id: 4,
      origem: "Terminal Cohama",
      destino: "Praia do Calhau",
      assentos: 2,
      preco: "R$ 12,50",
      motorista: "Mariana Almeida",
      avaliacao: 4.9,
      tempoEstimado: "18 min",
      veiculo: "Jeep Renegade - ILH1A23",
      tipo: 'ilha',
      horario: "08:00 - 18:00"
    },
    {
      id: 5,
      origem: "Renascença",
      destino: "Praia de Olho d'Água",
      assentos: 3,
      preco: "R$ 14,00",
      motorista: "Ricardo Borges",
      avaliacao: 4.8,
      tempoEstimado: "22 min",
      veiculo: "Toyota Corolla - ILH2B34",
      tipo: 'ilha',
      horario: "09:00 - 17:00"
    },
    {
      id: 6,
      origem: "Centro",
      destino: "Praia do Araçagy",
      assentos: 4,
      preco: "R$ 18,00",
      motorista: "Sofia Ribeiro",
      avaliacao: 4.7,
      tempoEstimado: "30 min",
      veiculo: "Fiat Toro - ILH3C45",
      tipo: 'ilha',
      horario: "07:30 - 19:00"
    },
    {
      id: 21,
      origem: "Terminal Cohab",
      destino: "Feira do Tirirical",
      assentos: 3,
      preco: "R$ 9,00",
      motorista: "Antônio Pereira",
      avaliacao: 4.8,
      tempoEstimado: "15 min",
      veiculo: "VW Saveiro - ILH4D56",
      tipo: 'ilha',
      horario: "05:00 - 12:00"
    },
    {
      id: 22,
      origem: "Angelim",
      destino: "Feira da Cohab",
      assentos: 2,
      preco: "R$ 7,50",
      motorista: "Cláudia Lima",
      avaliacao: 4.9,
      tempoEstimado: "10 min",
      veiculo: "Chevrolet Montana - ILH5E67",
      tipo: 'ilha',
      horario: "06:00 - 13:00"
    },
    {
      id: 23,
      origem: "São Francisco",
      destino: "Cinema do São Luís Shopping",
      assentos: 2,
      preco: "R$ 11,00",
      motorista: "Fernando Costa",
      avaliacao: 4.7,
      tempoEstimado: "16 min",
      veiculo: "Hyundai Creta - ILH6F78",
      tipo: 'ilha',
      horario: "14:00 - 23:00"
    },
    {
      id: 24,
      origem: "Cohama",
      destino: "Teatro Arthur Azevedo",
      assentos: 3,
      preco: "R$ 13,00",
      motorista: "Larissa Mendes",
      avaliacao: 4.8,
      tempoEstimado: "20 min",
      veiculo: "Nissan Kicks - ILH7G89",
      tipo: 'ilha',
      horario: "18:00 - 22:00"
    },
    {
      id: 25,
      origem: "Forquilha",
      destino: "Feira da Cohama",
      assentos: 2,
      preco: "R$ 8,00",
      motorista: "Rafael Silva",
      avaliacao: 4.7,
      tempoEstimado: "12 min",
      veiculo: "Fiat Strada - ILH8H12",
      tipo: 'ilha',
      horario: "07:00 - 14:00"
    },
    {
      id: 26,
      origem: "Calhau",
      destino: "Cinema do Tropical Shopping",
      assentos: 2,
      preco: "R$ 10,00",
      motorista: "Beatriz Lima",
      avaliacao: 4.9,
      tempoEstimado: "15 min",
      veiculo: "Honda Civic - ILH9I23",
      tipo: 'ilha',
      horario: "13:00 - 22:00"
    },
    {
      id: 27,
      origem: "Beira Mar",
      destino: "Cine Praia Grande",
      assentos: 3,
      preco: "R$ 9,50",
      motorista: "Gustavo Alves",
      avaliacao: 4.6,
      tempoEstimado: "10 min",
      veiculo: "Renault Kwid - ILH0J34",
      tipo: 'ilha',
      horario: "15:00 - 21:00"
    },
    {
      id: 28,
      origem: "Anjo da Guarda",
      destino: "Teatro Alcione Nazaré",
      assentos: 4,
      preco: "R$ 15,00",
      motorista: "Vanessa Rocha",
      avaliacao: 4.8,
      tempoEstimado: "25 min",
      veiculo: "Chevrolet Onix - ILH1K45",
      tipo: 'ilha',
      horario: "19:00 - 23:00"
    },
    {
      id: 29,
      origem: "Olho d'Água",
      destino: "Teatro da Cidade de São Luís",
      assentos: 2,
      preco: "R$ 12,00",
      motorista: "Felipe Martins",
      avaliacao: 4.7,
      tempoEstimado: "18 min",
      veiculo: "VW Gol - ILH2L56",
      tipo: 'ilha',
      horario: "17:00 - 22:00"
    },
    {
      id: 8,
      origem: "Parque do Rangedor",
      destino: "Convento das Mercês",
      assentos: 2,
      preco: "R$ 15,00",
      motorista: "Fernanda Lima",
      avaliacao: 4.7,
      tempoEstimado: "25 min",
      veiculo: "Kwid Vermelho - WXY2Z34",
      tipo: 'evento',
      data: "Domingo, 16 Dez",
      horario: "16:00"
    },
    // CORRIDAS ADICIONADAS A PARTIR DA PÁGINA 'eventos-culturais'
    {
      id: 16,
      origem: "Terminal Cohama",
      destino: "Centro de Cultura Popular", // Festival de Bumba Meu Boi
      assentos: 3,
      preco: "R$ 18,00",
      motorista: "Juliana Martins",
      avaliacao: 4.9,
      tempoEstimado: "22 min",
      veiculo: "Creta Branco - EVT1A23",
      tipo: 'evento',
      data: "Sexta, 28 Jun",
      horario: "17:30"
    },
    {
      id: 17,
      origem: "Renascença",
      destino: "Ponta d'Areia", // Noite do Reggae
      assentos: 2,
      preco: "R$ 14,00",
      motorista: "Roberto Dias",
      avaliacao: 4.8,
      tempoEstimado: "18 min",
      veiculo: "Corolla Prata - EVT2B34",
      tipo: 'evento',
      data: "Sexta, 05 Jul",
      horario: "21:00"
    },
    {
      id: 18,
      origem: "Centro",
      destino: "Lagoa da Jansen", // Arraial da Lagoa
      assentos: 4,
      preco: "R$ 16,50",
      motorista: "Beatriz Souza",
      avaliacao: 4.9,
      tempoEstimado: "20 min",
      veiculo: "HR-V Cinza - EVT3C45",
      tipo: 'evento',
      data: "Sábado, 29 Jun",
      horario: "18:30"
    },
    {
      id: 19,
      origem: "São Francisco",
      destino: "Centro Histórico", // Tour Histórico
      assentos: 3,
      preco: "R$ 12,00",
      motorista: "Lucas Ferreira",
      avaliacao: 4.8,
      tempoEstimado: "15 min",
      veiculo: "Onix Plus - EVT4D56",
      tipo: 'evento',
      data: "Sábado, 06 Jul",
      horario: "08:30"
    },
    {
      id: 20,
      origem: "Terminal Praia Grande",
      destino: "Senac Culinary", // Workshop de Gastronomia
      assentos: 2,
      preco: "R$ 13,50",
      motorista: "Carla Mendes",
      avaliacao: 4.7,
      tempoEstimado: "17 min",
      veiculo: "Argo Cinza - EVT5E67",
      tipo: 'evento',
      data: "Segunda, 08 Jul",
      horario: "14:30"
    },
    // CORRIDAS ZONA RURAL
    {
      id: 9,
      origem: "Tirirical",
      destino: "Terminal Cohab",
      assentos: 4,
      preco: "R$ 12,00",
      motorista: "José Ribeiro",
      avaliacao: 4.8,
      tempoEstimado: "45 min",
      veiculo: "S10 Cabine Dupla - RST1U23",
      tipo: 'rural',
      horario: "05:00 - 21:00"
    },
    {
      id: 10,
      origem: "Vila Ariri",
      destino: "Terminal Praia Grande",
      assentos: 3,
      preco: "R$ 10,00",
      motorista: "Antônio Costa",
      avaliacao: 4.9,
      tempoEstimado: "35 min",
      veiculo: "Duster Adventure - VWX4Y56",
      tipo: 'rural',
      horario: "05:30 - 20:30"
    },
    // CORRIDAS EM GRUPO - NOVAS
    {
      id: 11,
      origem: "Shopping da Ilha",
      destino: "Praia do Calhau",
      assentos: 4,
      preco: "R$ 5,00",
      motorista: "Grupo Viagem",
      avaliacao: 4.9,
      tempoEstimado: "18 min",
      veiculo: "Spin Prata - GRP1A23",
      tipo: 'grupo',
      pessoas: 3,
      economia: "R$ 10,00",
      horario: "07:00 - 23:00"
    },
    {
      id: 12,
      origem: "Terminal Cohama",
      destino: "Centro Histórico",
      assentos: 3,
      preco: "R$ 4,00",
      motorista: "Carona Amiga",
      avaliacao: 4.8,
      tempoEstimado: "12 min",
      veiculo: "Cobalt Branco - GRP4B56",
      tipo: 'grupo',
      pessoas: 2,
      economia: "R$ 8,00",
      horario: "06:30 - 22:30"
    },
    {
      id: 13,
      origem: "Renascença",
      destino: "São Francisco",
      assentos: 4,
      preco: "R$ 3,50",
      motorista: "Compartilhe Já",
      avaliacao: 4.7,
      tempoEstimado: "15 min",
      veiculo: "Siena Prata - GRP7C89",
      tipo: 'grupo',
      pessoas: 3,
      economia: "R$ 11,50",
      horario: "07:00 - 23:00"
    },
    {
      id: 14,
      origem: "Jardim América",
      destino: "Tirirical",
      assentos: 4,
      preco: "R$ 6,00",
      motorista: "Rota Compartilhada",
      avaliacao: 4.9,
      tempoEstimado: "25 min",
      veiculo: "Doblo Branca - GRP0D12",
      tipo: 'grupo',
      pessoas: 3,
      economia: "R$ 14,00",
      horario: "06:00 - 22:00"
    },
    {
      id: 15,
      origem: "Vinhais",
      destino: "Litorânea",
      assentos: 3,
      preco: "R$ 4,50",
      motorista: "Amigos do Bairro",
      avaliacao: 4.8,
      tempoEstimado: "20 min",
      veiculo: "Palio Weekend - GRP3E45",
      tipo: 'grupo',
      pessoas: 2,
      economia: "R$ 9,50",
      horario: "07:30 - 23:30"
    }
  ];

  // Combinar corridas pré-definidas com as do localStorage
  const todasCorridas = [...corridasPreDefinidas, ...corridasLocais];
  const corridasFiltradas = todasCorridas.filter(corrida => {
    // Se houver um filtro rideId, mostrar apenas essa corrida (quando navegamos a partir do Modo Ilha)
    if (filtroRideId) {
      const idNum = Number(filtroRideId);
      return corrida.id === idNum;
    }

    // Filtro básico por aba
    if (corrida.tipo !== abaAtiva) return false;

    // Filtro adicional para a aba 'evento' se um local foi especificado na URL
    if (abaAtiva === 'evento' && filtroDestinoEvento) {
      return corrida.destino.includes(filtroDestinoEvento);
    }
    return true;
  });

  const handleSelectCorrida = (corrida: Corrida) => {
    // Validação do Sentry mantida
    if (corrida.destino !== destinoEsperado) {
      const error = new Error(
        `Destino selecionado (${corrida.destino}) é diferente do destino esperado (${destinoEsperado})`
      );
      Sentry.captureException(error, {
        extra: {
          corridaSelecionada: corrida,
          destinoEsperado,
        },
      });
    }
    
    // Salva a corrida selecionada e vai direto para a página de pagamento
    localStorage.setItem('selectedCorrida', JSON.stringify(corrida));
    router.push('/pagamento');
  };

  const getAbaIcon = (tipo: string) => {
    switch (tipo) {
      case 'ilha':
        return <Navigation className="w-4 h-4" />;
      case 'evento':
        return <Calendar className="w-4 h-4" />;
      case 'rural':
        return <Trees className="w-4 h-4" />;
      case 'grupo':
        return <Share2 className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getAbaTitulo = (tipo: string) => {
    switch (tipo) {
      case 'geral':
        return 'Corridas Gerais';
      case 'ilha':
        return 'Modo Ilha';
      case 'evento':
        return 'Eventos Especiais';
      case 'rural':
        return 'Zona Rural';
      case 'grupo':
        return 'Corrida em Grupo';
      default:
        return 'Corridas';
    }
  };

  const getAbaDescricao = (tipo: string) => {
    switch (tipo) {
      case 'geral':
        return 'Corridas regulares por toda a cidade';
      case 'ilha':
        return 'Rotas especiais para a Ilha de São Luís';
      case 'evento':
        return 'Transporte para eventos e shows';
      case 'rural':
        return 'Conexão entre zona rural e terminais urbanos';
      case 'grupo':
        return 'Compartilhe a viagem e economize até 70%';
      default:
        return 'Encontre a melhor opção para sua viagem';
    }
  };

  const getCorridaColor = (tipo: string) => {
    // AGORA TODOS OS TIPOS USAM COR VERDE
    return {
      bg: 'from-green-800 to-green-600',
      lightBg: 'bg-green-50',
      border: 'border-green-100',
      text: 'text-green-800',
      button: 'bg-green-700 hover:bg-green-800',
      dot: 'bg-green-600'
    };
  };

  return (
    <div className="min-h-screen bg-green-50/50 selection:bg-yellow-400 selection:text-[#004d2b]">
      {/* Header Premium */}
      <header className="bg-[#004d2b] text-white py-6 px-4 md:px-8 border-b border-white/5 sticky top-0 z-[100] shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 hover:bg-white/10 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-white/10"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <Car className="w-5 h-5 text-[#004d2b] fill-[#004d2b]" />
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight uppercase">Corridas Disponíveis</h1>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-green-900/50 border border-green-700 px-3 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-300">Tempo Real</span>
          </div>
        </div>
      </header>

      <main className="py-8 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
        {/* Banner de Info */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border-8 border-white group">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-50 to-transparent -z-10"></div>
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-yellow-400/10 rounded-full blur-[60px] group-hover:bg-yellow-400/20 transition-all duration-700"></div>
          
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#004d2b] text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
              <Activity className="w-3 h-3 text-yellow-400" /> Sistema de Match Inteligente
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#004d2b] leading-tight">
              {getAbaTitulo(abaAtiva)}
            </h2>
            <p className="text-lg text-gray-500 font-medium">
              {getAbaDescricao(abaAtiva)}
            </p>
          </div>

          {/* Badges de Destaque */}
          <div className="flex flex-wrap gap-3 mt-8">
            {abaAtiva === 'geral' && (
              <>
                <span className="bg-green-100 text-[#004d2b] px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-green-200">🚗 Disponível 24h</span>
                <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-yellow-200">📍 Qualquer Destino</span>
              </>
            )}
            {abaAtiva === 'ilha' && (
              <>
                <span className="bg-green-100 text-[#004d2b] px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-green-200">🕐 Horários Fixos</span>
                <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-yellow-200">💰 Preços Reduzidos</span>
              </>
            )}
            {abaAtiva === 'rural' && (
              <>
                <span className="bg-green-100 text-[#004d2b] px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-green-200">🚜 Veículos 4x4</span>
                <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-yellow-200">📦 Espaço para Carga</span>
              </>
            )}
            {abaAtiva === 'grupo' && (
              <>
                <span className="bg-green-100 text-[#004d2b] px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-green-200">👥 Economia Social</span>
                <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-yellow-200">🤝 Viagem Coletiva</span>
              </>
            )}
          </div>
        </div>

        {/* Abas Estilizadas */}
        <div className="flex bg-white/50 backdrop-blur-md rounded-[2.5rem] p-2 border border-green-100 overflow-x-auto no-scrollbar">
          {(['geral', 'ilha', 'evento', 'rural', 'grupo'] as const).map((tipo) => (
            <button
              key={tipo}
              onClick={() => {
                setAbaAtiva(tipo);
                setFiltroDestinoEvento(null);
              }}
              className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 whitespace-nowrap min-w-[150px] ${
                abaAtiva === tipo
                  ? 'bg-[#004d2b] text-white shadow-xl translate-y-[-2px]'
                  : 'text-[#004d2b] hover:bg-white/80'
              }`}
            >
              {getAbaIcon(tipo)}
              <span>
                {tipo === 'geral' ? 'Frequente' : 
                 tipo === 'ilha' ? 'Modo Ilha' : 
                 tipo === 'evento' ? 'Eventos' : 
                 tipo === 'rural' ? 'Zona Rural' :
                 'Em Grupo'}
              </span>
            </button>
          ))}
        </div>

        {/* Grid de Corridas */}
        <div id="corridas-list" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {corridasFiltradas.map((corrida) => {
            const colors = getCorridaColor(corrida.tipo);
            const isSelected = corrida.id === selectedCorridaId;
            
            return (
              <div
                id={`corrida-${corrida.id}`}
                key={corrida.id}
                className={`group bg-white rounded-[3rem] overflow-hidden border-2 transition-all duration-500 flex flex-col h-full ${
                  isSelected 
                  ? 'border-yellow-400 shadow-2xl scale-[1.02]' 
                  : 'border-white hover:border-green-200 shadow-xl hover:shadow-[#004d2b]/10'
                }`}
              >
                {/* Header do Card */}
                <div className="p-8 pb-4">
                   <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                         <div className="bg-[#004d2b] w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-3 transition-transform">
                            <span className="text-white font-black text-lg uppercase">
                              {corrida.motorista.split(' ')[0].charAt(0)}{corrida.motorista.split(' ')[1]?.charAt(0) || ''}
                            </span>
                         </div>
                         <div>
                            <h4 className="font-black text-[#004d2b] uppercase text-sm tracking-tight">{corrida.motorista}</h4>
                            <div className="flex items-center gap-2 mt-1">
                               <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={10} className={`${i < Math.floor(corrida.avaliacao) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                                  ))}
                               </div>
                               <span className="text-[10px] font-black text-gray-400">{corrida.avaliacao}</span>
                            </div>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-3xl font-black text-[#004d2b] tracking-tighter">{corrida.preco}</p>
                         <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">por pessoa</p>
                      </div>
                   </div>

                   {/* Rota */}
                   <div className="relative pl-8 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-green-50">
                      <div className="relative">
                         <div className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#004d2b] z-10"></div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Partida</p>
                         <p className="font-bold text-[#004d2b]">{corrida.origem}</p>
                      </div>
                      <div className="relative">
                         <div className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-yellow-400 z-10"></div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Chegada</p>
                         <p className="font-bold text-[#004d2b]">{corrida.destino}</p>
                      </div>
                   </div>
                </div>

                {/* Footer do Card */}
                <div className="mt-auto p-8 pt-0 space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100 flex items-center gap-3">
                         <Clock size={16} className="text-[#004d2b]" />
                         <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tempo</p>
                            <p className="text-xs font-bold text-[#004d2b]">{corrida.tempoEstimado}</p>
                         </div>
                      </div>
                      <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100 flex items-center gap-3">
                         <Users size={16} className="text-[#004d2b]" />
                         <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Vagas</p>
                            <p className="text-xs font-bold text-[#004d2b]">{corrida.assentos} assento(s)</p>
                         </div>
                      </div>
                   </div>

                   {corrida.tipo === 'grupo' && corrida.economia && (
                     <div className="bg-yellow-400/10 p-4 rounded-2xl border border-yellow-400/20 flex items-center justify-between">
                        <span className="text-[10px] font-black text-[#004d2b] uppercase tracking-widest">Economia Real</span>
                        <span className="text-sm font-black text-green-700">-{corrida.economia}</span>
                     </div>
                   )}

                   <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                         <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Veículo</p>
                         <p className="text-[10px] font-bold text-[#004d2b] truncate">{corrida.veiculo}</p>
                      </div>
                      <button 
                        onClick={() => handleSelectCorrida(corrida)}
                        className="bg-[#004d2b] hover:bg-[#003823] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                      >
                        {corrida.tipo === 'grupo' ? 'Aderir' : 'Escolher'}
                        <ArrowRight size={14} />
                      </button>
                   </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensagem de Vazio Premium */}
        {corridasFiltradas.length === 0 && (
          <div className="bg-white rounded-[3rem] p-20 text-center border-4 border-dashed border-green-100 shadow-2xl">
            <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
               <MapPin className="w-10 h-10 text-[#004d2b] opacity-20" />
            </div>
            <h3 className="text-2xl font-black text-[#004d2b] uppercase tracking-tighter mb-4">
              Nenhuma corrida encontrada
            </h3>
            <p className="text-gray-500 max-w-md mx-auto font-medium">
              Não existem viagens disponíveis no momento para esta categoria. Tente novamente em alguns minutos ou altere o filtro.
            </p>
          </div>
        )}

        {/* Info Legenda */}
        <div className="flex flex-wrap items-center justify-center gap-8 py-6 px-12 bg-white rounded-full border border-green-100 shadow-lg max-w-fit mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-[#004d2b]"></div>
            <span className="text-[8px] font-black text-[#004d2b] uppercase tracking-[0.2em]">Partida</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-[8px] font-black text-[#004d2b] uppercase tracking-[0.2em]">Destino</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-[8px] font-black text-[#004d2b] uppercase tracking-[0.2em]">Motorista 5★</span>
          </div>
        </div>
      </main>
    </div>
  );
}
