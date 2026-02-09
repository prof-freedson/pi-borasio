/**
 * EXEMPLOS PRÁTICOS DE USO DOS COMPONENTES
 * ==========================================
 * 
 * Este arquivo contém exemplos de como usar todos os componentes
 * criados para o projeto BoraSiô.
 * 
 * NOTA: Este é um arquivo de referência com exemplos executáveis.
 * Todos os exemplos estão em funções que podem ser importadas.
 */

'use client';

import React from 'react';
import { MapPin, Users, Heart, Shield } from 'lucide-react';
import { PageHeader, HeroSection, FeaturesGrid, CTASection, LoadingSpinner } from '@/app/components/shared';
import { DriverProfileHeader, PersonalInfoSection, VehicleInfoSection, LatestRidesSection } from '@/app/components/motorista';
import { BeachCard, CinemaCard, TheaterCard, MarketCard } from '@/app/components/modo-ilha';
import { RouteItem, StepCard, RouteMap } from '@/app/components/conexao-rural';
import { useModoIlhaData, useRuralRouteSelection } from '@/app/hooks';

// ============================================
// 1. COMPONENTES COMPARTILHADOS (shared)
// ============================================

/**
 * Exemplo 1: Header simples
 * Componente básico de cabeçalho com título e botão voltar
 */
export function ExemploPageHeader() {
  return (
    <PageHeader 
      title="Bem-vindo ao BoraSiô" 
      subtitle="Sua mobilidade, do seu jeito"
    />
  );
}

/**
 * Exemplo 2: Hero Section completa
 * Banner com imagem, texto e botões de ação
 */
export function ExemploHeroSection() {
  return (
    <HeroSection
      title="Rotas Inteligentes"
      subtitle="Conectamos o campo à cidade com segurança e conforto"
      primaryButtonLabel="Pedir Corrida"
      primaryButtonHref="/corridas"
      secondaryButtonLabel="Saiba Mais"
      secondaryButtonHref="/sobre"
      imageUrl="https://example.com/image.jpg"
      imageAlt="Mapa de rotas"
    />
  );
}

/**
 * Exemplo 3: Grid de Features
 * Exibição de 4 funcionalidades principais em grid responsivo
 */
export function ExemploFeaturesGrid() {
  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-[#004d2b]" />,
      title: "Rotas Otimizadas",
      description: "Trajetos inteligentes que evitam trânsito"
    },
    {
      icon: <Users className="w-8 h-8 text-[#004d2b]" />,
      title: "Comunidade Ativa",
      description: "Milhares de usuários satisfeitos"
    },
    {
      icon: <Heart className="w-8 h-8 text-[#004d2b]" />,
      title: "Cuidamos de Você",
      description: "Segurança em primeiro lugar"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#004d2b]" />,
      title: "Proteção Total",
      description: "Dados seguros e privados"
    }
  ];

  return (
    <FeaturesGrid
      title="Por que escolher BoraSiô?"
      features={features}
      columns={4}
      background="white"
    />
  );
}

/**
 * Exemplo 4: CTA Section
 * Seção com chamada para ação com gradiente
 */
export function ExemploCTASection() {
  return (
    <CTASection
      title="Comece sua jornada agora!"
      subtitle="Baixe o app e ganhe R$ 10 de crédito"
      primaryButtonLabel="Baixar App"
      primaryButtonHref="/download"
      secondaryButtonLabel="Mais Informações"
      secondaryButtonHref="/sobre"
    />
  );
}

/**
 * Exemplo 5: Loading Spinner
 * Spinner de carregamento com texto customizado
 */
export function ExemploLoadingSpinner() {
  return <LoadingSpinner text="Carregando rotas disponíveis..." />;
}

// ============================================
// 2. COMPONENTES MOTORISTA
// ============================================

/**
 * Exemplo 6: Driver Profile Header
 * Header com perfil do motorista, rating e estatísticas
 */
export function ExemploDriverProfileHeader() {
  return (
    <DriverProfileHeader
      name="João Silva"
      memberSince="Janeiro 2023"
      profileImage="https://example.com/avatar.jpg"
      editButtonVisible={true}
    />
  );
}

/**
 * Exemplo 7: Personal Info Section (editable)
 * Seção com dados pessoais do motorista, editável
 */
export function ExemploPersonalInfoSection() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [personalData, setPersonalData] = React.useState({
    nome: 'João Silva',
    email: 'joao@example.com',
    telefone: '(11) 98765-4321',
    cpf: '123.456.789-00'
  });

  const personalFields = [
    { label: 'Nome', value: personalData.nome, setValue: (v: string) => setPersonalData({...personalData, nome: v}), icon: null },
    { label: 'E-mail', value: personalData.email, setValue: (v: string) => setPersonalData({...personalData, email: v}), icon: null },
    { label: 'Telefone', value: personalData.telefone, setValue: (v: string) => setPersonalData({...personalData, telefone: v}), icon: null },
    { label: 'CPF', value: personalData.cpf, setValue: (v: string) => setPersonalData({...personalData, cpf: v}), icon: null }
  ];

  return (
    <PersonalInfoSection
      fields={personalFields}
      isEditing={isEditing}
    />
  );
}

/**
 * Exemplo 8: Vehicle Info Section
 * Seção com informações do veículo e ações
 */
export function ExemploVehicleInfoSection() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [vehicleData, setVehicleData] = React.useState({
    marca: 'Toyota',
    modelo: 'Corolla',
    placa: 'ABC1234',
    cor: 'Prata'
  });

  const vehicleFields = [
    { label: 'Marca', value: vehicleData.marca, setValue: (v: string) => setVehicleData({...vehicleData, marca: v}), icon: null },
    { label: 'Modelo', value: vehicleData.modelo, setValue: (v: string) => setVehicleData({...vehicleData, modelo: v}), icon: null },
    { label: 'Placa', value: vehicleData.placa, setValue: (v: string) => setVehicleData({...vehicleData, placa: v}), icon: null },
    { label: 'Cor', value: vehicleData.cor, setValue: (v: string) => setVehicleData({...vehicleData, cor: v}), icon: null }
  ];

  return (
    <VehicleInfoSection
      fields={vehicleFields}
      isEditing={isEditing}
    />
  );
}

/**
 * Exemplo 9: Latest Rides Section
 * Seção mostrando as corridas recentes do motorista
 */
export function ExemploLatestRidesSection() {
  const corridas = [
    {
      passageiro: 'Maria Santos',
      localViagem: 'Centro',
      destino: 'Zona Leste',
      valor: 'R$ 42,50',
      data: '20/01/2024',
      duracao: '35 min',
      distancia: '12.5 km',
      pagamento: 'Dinheiro',
      status: 'Concluída',
      classificacao: '5',
      comentarios: 'Ótima corrida!'
    },
    {
      passageiro: 'Carlos Oliveira',
      localViagem: 'Estação',
      destino: 'Shopping',
      valor: 'R$ 28,90',
      data: '19/01/2024',
      duracao: '22 min',
      distancia: '8.3 km',
      pagamento: 'Cartão',
      status: 'Concluída',
      classificacao: '4',
      comentarios: 'Bom atendimento'
    }
  ];

  return (
    <LatestRidesSection
      corridas={corridas}
      onReport={(index) => console.log('Denunciar corrida:', index)}
    />
  );
}


// ============================================
// 3. COMPONENTES MODO ILHA
// ============================================

/**
 * Exemplo 10: Página completa Modo Ilha
 * Usando o hook de dados para carregar praias, cinemas, teatros e feiras
 */
export function ExemploModoIlhaPage() {
  const { beaches, cinemas, theaters, markets, loading } = useModoIlhaData() as any;

  if (loading) {
    return <LoadingSpinner text="Carregando informações do Modo Ilha..." />;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#DAF3D7] to-[#B8E1B3]">
      <PageHeader title="Modo Ilha" subtitle="Diversão ao seu alcance" />

      {/* Seção Praias */}
      <section className="py-16 px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-8 text-[#004d2b]">Praias Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beaches.map((beach: any) => (
            <BeachCard
              key={beach.id}
              beach={beach}
              onRequestRide={(rideId) => {
                console.log('Solicitação de corrida para praia:', rideId);
                window.location.href = `/corridas?tipo=praia&rideId=${rideId}`;
              }}
            />
          ))}
        </div>
      </section>

      {/* Seção Cinemas */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-[#004d2b]">Cinemas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cinemas.map((cinema: any) => (
            <CinemaCard
              key={cinema.id}
              cinema={cinema}
              onRequestRide={(rideId) => {
                console.log('Solicitação de corrida para cinema:', rideId);
              }}
            />
          ))}
        </div>
      </section>

      {/* Seção Teatros */}
      <section className="py-16 px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-8 text-[#004d2b]">Teatros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {theaters.map((theater: any) => (
            <TheaterCard
              key={theater.id}
              theater={theater}
              onRequestRide={(rideId) => {
                console.log('Solicitação de corrida para teatro:', rideId);
              }}
            />
          ))}
        </div>
      </section>

      {/* Seção Feiras */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-[#004d2b]">Feiras Livres</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market: any) => (
            <MarketCard
              key={market.id}
              market={market}
              onRequestRide={(rideId) => {
                console.log('Solicitação de corrida para feira:', rideId);
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}


// ============================================
// 4. COMPONENTES CONEXÃO RURAL
// ============================================

/**
 * Exemplo 11: Página completa Conexão Rural Terminal
 * Com seleção de rotas, mapa e agendamento
 */
export function ExemploConexaoRuralPage() {
  const {
    selectedRoute,
    routeReserved,
    handleCitySelect,
    handleReserveRoute,
    handleGoToRides
  } = useRuralRouteSelection();

  const handleSelectRoute = (id: number) => {
    console.log('Rota selecionada:', id);
  };

  const routes = [
    {
      id: 1,
      origin: "Tirirical",
      destination: "Terminal Cohab",
      time: "45 min",
      price: "R$ 12,00"
    },
    {
      id: 2,
      origin: "Tirirical",
      destination: "Rodoviária Central",
      time: "50 min",
      price: "R$ 14,00"
    },
    {
      id: 3,
      origin: "Vila Olho d'Água",
      destination: "Terminal Cohab",
      time: "35 min",
      price: "R$ 10,00"
    }
  ];

  const locations = [
    { id: 1, name: "Tirirical", lat: -2.89, lng: -60.21 },
    { id: 2, name: "Vila Olho d'Água", lat: -2.92, lng: -60.24 },
    { id: 3, name: "Terminal Cohab", lat: -3.10, lng: -60.02 }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#DAF3D7] to-[#B8E1B3]">
      <PageHeader 
        title="Conexão Rural Terminal" 
        subtitle="Conectando o campo à cidade" 
      />

      <section className="py-16 px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Lista de Rotas */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-4">Rotas Disponíveis</h3>
            <div className="space-y-4">
              {routes.map((route) => (
                <RouteItem
                  key={route.id}
                  route={route}
                  isSelected={selectedRoute === route.id}
                  isReserved={routeReserved === route.id}
                  onSelect={() => handleSelectRoute(route.id)}
                  onReserve={() => handleReserveRoute(route.id)}
                />
              ))}
            </div>
          </div>

          {/* Mapa de Rotas */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-2xl font-bold text-[#004d2b] mb-4">Mapa</h3>
            <RouteMap
              selectedRoute={selectedRoute}
              routes={routes}
              locations={locations}
            />
          </div>
        </div>
      </section>

      {/* Steps de Agendamento */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <h3 className="text-3xl font-bold text-center text-[#004d2b] mb-12">Como Agendar sua Corrida</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StepCard
            number={1}
            title="Baixe o App"
            description="Instale o BoraSiô na sua loja de aplicativos"
          />
          <StepCard
            number={2}
            title="Selecione a Rota"
            description="Escolha a origem e destino desejados"
          />
          <StepCard
            number={3}
            title="Agende"
            description="Escolha data, hora e forma de pagamento"
          />
          <StepCard
            number={4}
            title="Confirme"
            description="Pronto! Sua corrida está agendada"
          />
        </div>
      </section>
    </div>
  );
}


// ============================================
// 5. PADRÕES DE INTEGRAÇÃO
// ============================================

/**
 * ✅ PADRÃO CORRETO - Organização clara
 * Imports no topo, hooks antes de JSX, lógica separada
 */
export function BomExemploIntegracao() {
  // 1. Imports (no topo do arquivo)
  // 2. State e hooks
  const { beaches, cinemas, loading } = useModoIlhaData() as any;
  const [isEditing, setIsEditing] = React.useState(false);

  // 3. Handlers e callbacks
  const handleSave = () => {
    console.log('Salvando dados...');
  };

  // 4. Render
  if (loading) {
    return <LoadingSpinner text="Carregando..." />;
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Exemplo Bom" subtitle="Padrão correto" />
      {/* Componentes aqui */}
    </div>
  );
}

/**
 * ❌ PADRÃO INCORRETO - Evitar isso
 * Lógica inline, código bagunçado, difícil de manter
 */
export function MauExemploIntegracao() {
  // Lógica confusa misturada com JSX
  const [complexState, setComplexState] = React.useState<any>(null);
  
  React.useEffect(() => {
    // 100 linhas de lógica aqui
    console.log('Lógica bagunçada');
  }, []);

  return (
    <div>
      {/* HTML inline com condicionais complicadas */}
      {complexState && Array.isArray(complexState) && complexState.map((item: any) => (
        <div key={item.id} onClick={() => {
          // Handlers inline
          setComplexState(complexState.map((i: any) => i.id === item.id ? { ...i, selected: true } : i));
        }}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

// ============================================
// 6. CUSTOMIZAÇÃO E EXTENSÃO
// ============================================

/**
 * Exemplo 12: Estender um componente existente
 * Adicionar badge premium ao BeachCard
 */
export function PremiumBeachCard({ 
  beach, 
  onRequestRide 
}: { 
  beach: any; 
  onRequestRide: (id: number) => void 
}) {
  return (
    <div className="relative">
      <div className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold z-10">
        Premium ⭐
      </div>
      <BeachCard beach={beach} onRequestRide={onRequestRide} />
    </div>
  );
}

/**
 * Exemplo 13: Criar variante compacta de componente
 * Versão reduzida do BeachCard para listas
 */
export function CompactBeachCard({ 
  beach, 
  onRequestRide 
}: { 
  beach: any; 
  onRequestRide: (id: number) => void 
}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h4 className="font-bold text-[#004d2b] mb-1">{beach.name}</h4>
      <p className="text-sm text-gray-600 mb-3">{beach.description}</p>
      <button
        onClick={() => onRequestRide(beach.rideId)}
        className="w-full bg-[#004d2b] text-white py-2 text-sm rounded-lg hover:bg-[#003a1f] transition-colors"
      >
        Pedir Corrida
      </button>
    </div>
  );
}


// ============================================
// 7. TESTES COM COMPONENTES
// ============================================

/**
 * Exemplo 14: Teste unitário de componente
 * Exemplo usando React Testing Library
 */
export function ComponentTesting() {
  // Exemplo de mock data
  const mockBeach = {
    id: 1,
    rideId: 10,
    name: "Praia do Calhau",
    description: "Uma das praias mais movimentadas de São Luís",
    rating: 4.5,
    bestTime: "Manhã",
    parking: "Pago",
    facilities: ["Quiosques", "Banheiros", "Chuveiros"]
  };

  // Exemplo de teste:
  /*
  import { render, screen, fireEvent } from '@testing-library/react';

  describe('BeachCard', () => {
    it('deve renderizar nome da praia', () => {
      render(<BeachCard beach={mockBeach} onRequestRide={() => {}} />);
      expect(screen.getByText("Praia do Calhau")).toBeInTheDocument();
    });

    it('deve chamar callback ao clicar em Pedir Corrida', () => {
      const handleRide = jest.fn();
      render(<BeachCard beach={mockBeach} onRequestRide={handleRide} />);
      
      const button = screen.getByText("Pedir Corrida");
      fireEvent.click(button);
      
      expect(handleRide).toHaveBeenCalledWith(10);
    });
  });
  */

  return (
    <div className="bg-yellow-50 p-4 rounded text-sm text-gray-700">
      <p>Veja os comentários acima para exemplos de testes com React Testing Library</p>
    </div>
  );
}

// ============================================
// FIM DOS EXEMPLOS - Arquivo de Referência
// ============================================

/**
 * Como usar este arquivo:
 * 
 * 1. Importe as funções de exemplo conforme necessário
 * 2. Use como referência para implementar suas próprias páginas
 * 3. Adapte os exemplos para seus casos de uso específicos
 * 4. Consulte o README.md na pasta components para mais detalhes
 * 
 * Todos os exemplos estão em funções que podem ser importadas
 * e usadas em seus componentes React.
 */
