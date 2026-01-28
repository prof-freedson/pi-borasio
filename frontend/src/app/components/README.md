# Estrutura de Componentes - Telas Modeladas

Este documento descreve a estrutura de componentes criados para as três telas de modelagem do projeto.

## 📁 Estrutura de Diretórios

```
frontend/src/app/
├── components/
│   ├── shared/              # Componentes reutilizáveis
│   │   ├── PageHeader.tsx        # Header de páginas
│   │   ├── HeroSection.tsx       # Seção hero
│   │   ├── FeaturesGrid.tsx      # Grid de features
│   │   ├── CTASection.tsx        # Call-to-action
│   │   ├── LoadingSpinner.tsx    # Loading
│   │   └── index.ts
│   ├── motorista/           # Componentes da página Motorista
│   │   ├── DriverProfileHeader.tsx
│   │   ├── PersonalInfoSection.tsx
│   │   ├── VehicleInfoSection.tsx
│   │   ├── LatestRidesSection.tsx
│   │   └── index.ts
│   ├── modo-ilha/           # Componentes da página Modo Ilha
│   │   ├── BeachCard.tsx
│   │   ├── CinemaCard.tsx
│   │   ├── TheaterCard.tsx
│   │   ├── MarketCard.tsx
│   │   └── index.ts
│   └── conexao-rural/       # Componentes Conexão Rural-Terminal
│       ├── RouteItem.tsx
│       ├── StepCard.tsx
│       ├── RouteMap.tsx
│       └── index.ts
└── hooks/                   # Hooks customizados
    ├── useModoIlhaData.ts       # Hook para carregar dados do Modo Ilha
    ├── useRuralRouteSelection.ts # Hook para seleção de rotas rurais
    └── index.ts
```

## 🎯 Componentes Compartilhados (Shared)

### PageHeader
Header reutilizável para todas as páginas com botão de voltar.

```tsx
import { PageHeader } from '@/app/components/shared';

<PageHeader 
  title="Meu Título"
  subtitle="Subtítulo opcional"
  showBackButton={true}
  backHref="/"
/>
```

### HeroSection
Seção hero com texto, botões e imagem opcional.

```tsx
import { HeroSection } from '@/app/components/shared';

<HeroSection
  title="Bem-vindo"
  subtitle="Descrição da seção"
  primaryButtonLabel="Começar"
  primaryButtonHref="/corridas"
  secondaryButtonLabel="Saiba Mais"
  secondaryButtonHref="/sobre"
  imageUrl="https://..."
  imageAlt="Imagem descritiva"
/>
```

### FeaturesGrid
Grid de features com ícones e descrições.

```tsx
import { FeaturesGrid } from '@/app/components/shared';
import { MapPin, Users } from 'lucide-react';

const features = [
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Localização",
    description: "Encontre o melhor trajeto"
  },
  // ...
];

<FeaturesGrid
  title="Nossas Vantagens"
  features={features}
  columns={4}
  background="white"
/>
```

### CTASection
Seção de chamada para ação com gradiente.

```tsx
import { CTASection } from '@/app/components/shared';

<CTASection
  title="Pronto para começar?"
  subtitle="Baixe nosso app agora"
  primaryButtonLabel="Download"
  primaryButtonHref="/download"
  secondaryButtonLabel="Contato"
  secondaryButtonHref="/contato"
/>
```

### LoadingSpinner
Spinner de carregamento reutilizável.

```tsx
import { LoadingSpinner } from '@/app/components/shared';

{loading && <LoadingSpinner text="Carregando dados..." />}
```

## 🚗 Componentes Motorista

### DriverProfileHeader
Header do perfil do motorista com foto e nome.

```tsx
import { DriverProfileHeader } from '@/app/components/motorista';

<DriverProfileHeader
  name="João Silva"
  memberSince="Abril 2024"
  profileImage="https://..."
  editButtonVisible={true}
/>
```

### PersonalInfoSection
Seção de informações pessoais com modo edição.

```tsx
import { PersonalInfoSection } from '@/app/components/motorista';
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';

const fields = [
  {
    label: "Nome",
    value: nome,
    setValue: setNome,
    icon: faUser
  },
  // ...
];

<PersonalInfoSection fields={fields} isEditing={modoEdicao} />
```

### VehicleInfoSection
Seção de informações do veículo.

```tsx
import { VehicleInfoSection } from '@/app/components/motorista';

const vehicleFields = [
  {
    label: "Marca",
    value: marca,
    setValue: setMarca,
    icon: faCarSide
  },
  // ...
];

<VehicleInfoSection fields={vehicleFields} isEditing={modoEdicao} />
```

### LatestRidesSection
Lista de últimas corridas com detalhes.

```tsx
import { LatestRidesSection } from '@/app/components/motorista';

<LatestRidesSection
  corridas={corridas}
  onReport={(index) => alert(`Corrida ${index} denunciada`)}
/>
```

## 🏖️ Componentes Modo Ilha

### BeachCard
Card de praia com avaliação e facilidades.

```tsx
import { BeachCard } from '@/app/components/modo-ilha';

<BeachCard
  beach={beach}
  onRequestRide={(rideId) => {
    window.location.href = `/corridas?tipo=ilha&rideId=${rideId}`;
  }}
/>
```

### CinemaCard
Card de cinema com filmes e horários.

```tsx
import { CinemaCard } from '@/app/components/modo-ilha';

<CinemaCard
  cinema={cinema}
  onRequestRide={(rideId) => handleRideRequest(rideId)}
/>
```

### TheaterCard
Card de teatro com apresentações.

```tsx
import { TheaterCard } from '@/app/components/modo-ilha';

<TheaterCard
  theater={theater}
  onRequestRide={(rideId) => handleRideRequest(rideId)}
/>
```

### MarketCard
Card de feira com produtos e horários.

```tsx
import { MarketCard } from '@/app/components/modo-ilha';

<MarketCard
  market={market}
  onRequestRide={(rideId) => handleRideRequest(rideId)}
/>
```

## 🚌 Componentes Conexão Rural-Terminal

### RouteItem
Item de rota com seleção e reserva.

```tsx
import { RouteItem } from '@/app/components/conexao-rural';

<RouteItem
  route={route}
  isSelected={selectedRoute === route.id}
  isReserved={routeReserved === route.id}
  onSelect={() => setSelectedRoute(route.id)}
  onReserve={() => handleReserveRoute(route.id)}
/>
```

### StepCard
Card de passo para guia de agendamento.

```tsx
import { StepCard } from '@/app/components/conexao-rural';

<StepCard
  number={1}
  title="Baixe o App"
  description="Instale o Bora Siô na sua loja de aplicativos"
/>
```

### RouteMap
Mapa visual de rotas com terminais e zona rural.

```tsx
import { RouteMap } from '@/app/components/conexao-rural';

<RouteMap
  selectedRoute={selectedRoute}
  routes={routes}
  locations={locations}
/>
```

## 🪝 Hooks Customizados

### useModoIlhaData
Hook para carregar todos os dados do Modo Ilha (praias, cinemas, teatros, feiras).

```tsx
import { useModoIlhaData } from '@/app/hooks';

export default function ModoIlhaPage() {
  const { beaches, cinemas, theaters, markets, loading } = useModoIlhaData();

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* Renderizar dados */}
    </div>
  );
}
```

### useRuralRouteSelection
Hook para gerenciar seleção e reserva de rotas rurais.

```tsx
import { useRuralRouteSelection } from '@/app/hooks';

export default function ConexaoRuralTerminal() {
  const {
    selectedRoute,
    selectedCity,
    routeReserved,
    handleCitySelect,
    handleReserveRoute,
    handleGoToRides
  } = useRuralRouteSelection();

  return (
    // Usar estados e funções do hook
  );
}
```

## 📋 Benefícios da Estrutura

✅ **Componentes Reutilizáveis**: Evita duplicação de código  
✅ **Modularidade**: Fácil manutenção e testes  
✅ **Escalabilidade**: Adicionar novas páginas é mais rápido  
✅ **Consistência**: Design system unificado  
✅ **Performance**: Componentes otimizados e bem estruturados  
✅ **Hooks Customizados**: Lógica compartilhada centralizada  

## 🔄 Próximos Passos

1. Refatorar as páginas existentes para usar esses componentes
2. Criar testes unitários para os componentes
3. Adicionar storybook para documentação visual
4. Implementar mais hooks customizados conforme necessário
5. Considerar criação de um design system completo

## 📝 Notas

- Todos os componentes usam Tailwind CSS para estilização
- Cores padrão: `#004d2b` (verde escuro), `#FFD700` (amarelo)
- Ícones: Lucide React e Font Awesome
- Responsive design em todos os componentes
