# 📋 Guia de Integração dos Componentes

## 🚀 Como Usar os Componentes nas Páginas

Este guia mostra como integrar os componentes modulares nas três páginas modeladas.

## 🔄 Passo 1: Migração da Página Motorista

### Antes (Monolítico)
A página original tinha toda a lógica e UI em um único arquivo.

### Depois (Modular)
Agora usamos componentes compartilhados e específicos:

```tsx
import { PageHeader } from "@/app/components/shared";
import {
  DriverProfileHeader,
  PersonalInfoSection,
  VehicleInfoSection,
  LatestRidesSection,
} from "@/app/components/motorista";

export default function Motorista() {
  // ... estado e lógica ...
  
  return (
    <div>
      <PageHeader title="Painel do Motorista" />
      <DriverProfileHeader {...props} />
      <PersonalInfoSection fields={fields} isEditing={editing} />
      <VehicleInfoSection fields={fields} isEditing={editing} />
      <LatestRidesSection corridas={corridas} />
    </div>
  );
}
```

**Benefícios:**
- ✅ Código mais legível e organizado
- ✅ Componentes reutilizáveis
- ✅ Facilita testes unitários
- ✅ Melhor manutenção

---

## 🏖️ Passo 2: Refatoração da Página Modo Ilha

### Antes
```tsx
// Componentes inline com lógica misturada
export default function ModoIlhaPage() {
  const [beaches, setBeaches] = useState([]);
  
  return (
    <div>
      {beaches.map((beach) => (
        <div key={beach.id}>
          {/* HTML inline */}
        </div>
      ))}
    </div>
  );
}
```

### Depois
```tsx
import { useModoIlhaData } from '@/app/hooks';
import { BeachCard, CinemaCard, MarketCard } from '@/app/components/modo-ilha';
import { PageHeader, HeroSection, LoadingSpinner } from '@/app/components/shared';

export default function ModoIlhaPage() {
  const { beaches, cinemas, markets, loading } = useModoIlhaData();
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <>
      <PageHeader title="Modo Ilha" />
      <HeroSection {...heroProps} />
      <section>
        {beaches.map((beach) => (
          <BeachCard key={beach.id} beach={beach} onRequestRide={handleRide} />
        ))}
      </section>
    </>
  );
}
```

**Checklist de Integração:**
- [ ] Importar hook `useModoIlhaData`
- [ ] Importar componentes do shared
- [ ] Importar componentes do modo-ilha
- [ ] Remover código inline de cards
- [ ] Substituir maps por componentes
- [ ] Testar carregamento de dados
- [ ] Validar responsividade

---

## 🚌 Passo 3: Refatoração da Página Conexão Rural-Terminal

### Estrutura Proposta
```tsx
import { useRuralRouteSelection } from '@/app/hooks';
import { RouteItem, StepCard, RouteMap } from '@/app/components/conexao-rural';
import { PageHeader, FeaturesGrid, CTASection } from '@/app/components/shared';

export default function ConexaoRuralTerminal() {
  const {
    selectedRoute,
    routeReserved,
    handleCitySelect,
    handleReserveRoute,
    handleGoToRides
  } = useRuralRouteSelection();

  return (
    <>
      <PageHeader title="Conexão Rural-Terminal" />
      <HeroSection {...props} />
      <FeaturesGrid title="Como Funciona" features={features} />
      
      <section className="grid lg:grid-cols-2 gap-8">
        <div>
          {routes.map((route) => (
            <RouteItem
              key={route.id}
              route={route}
              isSelected={selectedRoute === route.id}
              isReserved={routeReserved === route.id}
              onSelect={() => setSelectedRoute(route.id)}
              onReserve={() => handleReserveRoute(route.id)}
            />
          ))}
        </div>
        
        <RouteMap
          selectedRoute={selectedRoute}
          routes={routes}
          locations={locations}
        />
      </section>
      
      <CTASection {...ctaProps} />
    </>
  );
}
```

---

## 📦 Padrão de Importação

### Componentes Compartilhados
```tsx
// ✅ Recomendado: Import nomeado
import { PageHeader, HeroSection } from '@/app/components/shared';

// ❌ Evitar: Import padrão
import PageHeader from '@/app/components/shared/PageHeader';
```

### Componentes Específicos
```tsx
// ✅ Recomendado
import { BeachCard, CinemaCard } from '@/app/components/modo-ilha';

// ❌ Evitar misturar
import BeachCard from '@/app/components/modo-ilha/BeachCard';
```

### Hooks
```tsx
// ✅ Recomendado
import { useModoIlhaData, useRuralRouteSelection } from '@/app/hooks';

// ❌ Evitar
import useModoIlhaData from '@/app/hooks/useModoIlhaData';
```

---

## 🔧 Personalização de Componentes

### Props Comuns
Todos os componentes compartilhados aceitam:
- `className` (opcional): Classes Tailwind adicionais
- Propriedades específicas conforme documentação

### Exemplo de Extensão
```tsx
// Criar versão customizada de um componente
import { FeaturesGrid } from '@/app/components/shared';

export function CustomFeaturesGrid(props) {
  return (
    <FeaturesGrid
      {...props}
      columns={3}
      background="green"
    />
  );
}
```

---

## 🧪 Testes com Componentes

### Exemplo de Teste
```tsx
import { render, screen } from '@testing-library/react';
import { BeachCard } from '@/app/components/modo-ilha';

describe('BeachCard', () => {
  it('deve renderizar nome da praia', () => {
    const beach = { 
      id: 1, 
      name: 'Praia do Calhau',
      // ... outras propriedades
    };
    
    render(<BeachCard beach={beach} onRequestRide={() => {}} />);
    expect(screen.getByText('Praia do Calhau')).toBeInTheDocument();
  });
});
```

---

## 📊 Checklist de Qualidade

Antes de fazer merge, verificar:

- [ ] Todos os componentes estão importados corretamente
- [ ] Propriedades estão sendo passadas corretamente
- [ ] Sem código duplicado
- [ ] Responsividade testada
- [ ] Acessibilidade verificada
- [ ] Sem warnings no console
- [ ] TypeScript sem erros
- [ ] Tests passando

---

## 🎨 Estilo e Consistência

### Cores Padrão
```tsx
// Verde principal
bg-[#004d2b]

// Amarelo destaque
bg-[#FFD700]

// Fundos verdes
bg-green-50 | bg-green-100 | bg-green-700
```

### Espaçamento
- Padding seções: `p-6` ou `px-4 sm:px-6 lg:px-8`
- Margin entre seções: `py-16`
- Gap entre items: `gap-4` a `gap-8`

### Tipografia
- Títulos: `text-3xl font-bold`
- Subtítulos: `text-xl font-semibold`
- Corpo: `text-gray-600`

---

## 📞 Suporte

Para dúvidas sobre componentes:
1. Verificar documentação em `README.md`
2. Ver exemplos em `page-refactored.tsx`
3. Consultar tipos TypeScript nos arquivos `.tsx`

---

## 🚀 Próximas Fases

**Fase 1 (Atual):** ✅ Componentes criados
**Fase 2:** Refatorar páginas (motorista, modo-ilha, conexão-rural)
**Fase 3:** Criar testes unitários
**Fase 4:** Adicionar Storybook
**Fase 5:** Design system completo
