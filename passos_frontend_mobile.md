# Guia de Implementação: Frontend Mobile (React Native + Expo)

Este documento descreve os passos para criar a versão mobile do projeto `borasio`, utilizando **React Native** com **Expo** e **TypeScript**. O objetivo é replicar as funcionalidades do frontend web (`next.js`) e integrar com o novo backend Node.js.

## 1. Stack Tecnológica Mobile

Para manter a consistência com o ecossistema moderno e agilidade no desenvolvimento:

*   **Framework**: Expo (Managed Workflow) - *Facilita o acesso a APIs nativas (câmera, localização).*
*   **Linguagem**: TypeScript.
*   **Roteamento**: Expo Router - *Similar ao Next.js App Router usado na web.*
*   **Estilização**: NativeWind (Tailwind CSS para React Native) - *Permite reutilizar conhecimentos do frontend web.*
*   **Mapas**: `react-native-maps` - *Padrão de mercado para mapas nativos (Google/Apple).*
*   **Requisições HTTP**: Axios.
*   **Real-time**: `socket.io-client`.
*   **Ícones**: `lucide-react-native` (compatível com o web).

---

## 2. Comparativo Web vs. Mobile

| Funcionalidade | Frontend Web (Next.js) | Frontend Mobile (Expo) |
| :--- | :--- | :--- |
| **Navegação** | File-system routing (`src/app`) | Expo Router (`app/`) |
| **Estilos** | Tailwind CSS (`className`) | NativeWind (`className` / `style`) |
| **Mapas** | Leaflet / Google Maps JS | `react-native-maps` (Nativo) |
| **Localização** | Browser Geolocation API | `expo-location` |
| **Armazenamento** | `localStorage` / Cookies | `expo-secure-store` |
| **Ícones** | `lucide-react` | `lucide-react-native` |

---

## 3. Passo a Passo da Criação

### Passo 1: Inicialização do Projeto

No diretório raiz (fora de `frontend` ou `backend`), crie o projeto mobile:

```bash
npx create-expo-app@latest mobile -t expo-template-blank-typescript
cd mobile
```

### Passo 2: Instalação das Dependências Principais

Instale as bibliotecas equivalentes às do web e necessárias para a lógica do app:

```bash
# Navegação e Gestos
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

# Estilização (NativeWind v4)
npm install nativewind
npm install --save-dev tailwindcss

# Mapas e Localização
npx expo install react-native-maps expo-location

# Comunicação e Utilitários
npm install axios socket.io-client date-fns lucide-react-native clsx
npx expo install expo-secure-store
```

### Passo 3: Configuração do NativeWind (Tailwind)

Para usar as mesmas classes do web:

1.  Execute `npx tailwindcss init`.
2.  Configure o `tailwind.config.js`:
    ```javascript
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```
3.  Adicione o plugin ao `babel.config.js`:
    ```javascript
    module.exports = function (api) {
      api.cache(true);
      return {
        presets: ['babel-preset-expo'],
        plugins: ["nativewind/babel"],
      };
    };
    ```

### Passo 4: Estrutura de Pastas e Arquivos Detalhada

Abaixo, detalhamos o propósito de cada diretório e os arquivos essenciais para organizar o projeto React Native com Expo Router de forma escalável.

```
mobile/
├── app/                 # SISTEMA DE ROTAS (File-based routing)
│   ├── (auth)/          # Grupo de rotas sem layout de abas (Login, Registro)
│   │   ├── _layout.tsx  # Define header oculto ou transições específicas
│   │   ├── login.tsx    # Tela de Login
│   │   └── register.tsx # Tela de Cadastro
│   │
│   ├── (tabs)/          # Grupo de rotas com menu inferior (Bottom Tabs)
│   │   ├── _layout.tsx  # Configuração da TabBar (ícones, cores)
│   │   ├── index.tsx    # Tela Principal (Mapa / Solicitar Carona)
│   │   ├── rides.tsx    # Histórico de Corridas
│   │   └── profile.tsx  # Perfil do Usuário
│   │
│   ├── _layout.tsx      # Layout RAÍZ: Configura o Contexto de Auth e Fontes
│   └── +not-found.tsx   # Tela de 404 padrão
│
├── components/          # Componentes Reutilizáveis (UI Kit)
│   ├── ui/              # Componentes genéricos (Botões, Inputs, Cards)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── MapMarker.tsx
│   ├── RideRequest.tsx  # Modal/Formulário específico para pedir carona
│   └── DriverInfo.tsx   # Card com info do motorista
│
├── constants/           # Constantes globais
│   ├── Colors.ts        # Paleta de cores do Design System
│   └── Styles.ts        # Estilos globais (se não usar apenas Tailwind)
│
├── contexts/            # Estados Globais (Context API)
│   ├── AuthContext.tsx  # Gerencia usuário logado, token e funções de login/logout
│   └── LocationContext.tsx # Gerencia permissões e localização GPS atual
│
├── hooks/               # Custom Hooks (Lógica encapsulada)
│   ├── useSocket.ts     # Gerencia conexão e eventos do Socket.io
│   └── useRide.ts       # Lógica específica da corrida (status, preço)
│
├── services/            # Comunicação com o Mundo Externo
│   ├── api.ts           # Configuração do Axios (baseURL, interceptors de token)
│   └── socket.ts        # Instância única do Socket.io-client
│
├── assets/              # Recursos Estáticos
│   ├── images/          # Logotipos, avatares default
│   └── fonts/           # Fontes personalizadas
│
└── utils/               # Funções Utilitárias
    ├── formatCurrency.ts # Formata valores monetários (R$)
    └── validators.ts    # Validações de formulário (Email, Senha)
```

#### Detalhamento das Responsabilidades:

1.  **`app/_layout.tsx`**: É o arquivo mais importante. Ele envolve toda a aplicação. Aqui você carrega fontes, inicializa o sistema de navegação (`Stack`) e provê contextos globais (como AuthProvider).
2.  **`app/(tabs)/_layout.tsx`**: Define a navegação por abas. Aqui você escolhe quais telas aparecem no menu inferior e define seus ícones (`TabBarIcon`).
3.  **`services/api.ts`**: Centraliza as chamadas ao backend. Configure aqui o IP da sua máquina (ex: `192.168...`) pois o emulador/celular não entende `localhost` da mesma forma que a web.
4.  **`contexts/AuthContext.tsx`**: Guarda o Token JWT no `SecureStore` (memória segura do celular) e decide se o usuário vai para a tela de Login ou para o Mapa automaticamente ao abrir o app.

### Passo 5: Implementação das Funcionalidades

#### A. Configuração da API (`services/api.ts`)
Conecte ao backend Node.js (lembre-se de usar o IP da máquina, não `localhost`, para testar no celular).

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.x.x:3000', // Substitua pelo seu IP local
});

export default api;
```

#### B. Autenticação (Login)
Use `expo-secure-store` para salvar o token JWT recebido do backend.

```typescript
import * as SecureStore from 'expo-secure-store';

async function login(email, password) {
  const response = await api.post('/auth/login', { email, password });
  await SecureStore.setItemAsync('token', response.data.token);
}
```

#### C. Mapa e Geolocalização
No arquivo `app/(tabs)/index.tsx`:

1.  Use `expo-location` para pedir permissão e pegar a posição atual.
2.  Renderize o `<MapView />` do `react-native-maps`.
3.  Desenhe marcadores (`<Marker />`) para o usuário e motoristas próximos (via WebSocket).
4.  Use `<Polyline />` para traçar a rota da corrida (se houver).

#### D. WebSockets (Real-time)
Crie um hook ou context para gerenciar o Socket.io.

```typescript
import io from 'socket.io-client';
const socket = io('http://192.168.x.x:3000');

socket.on('connect', () => {
  console.log('Conectado ao WebSocket');
});

// Enviar localização em tempo real (se for motorista em corrida)
socket.emit('update_location', { lat, lng });
```

---

## 4. Próximos Passos

1.  **Criar o projeto**: Rodar os comandos de inicialização listados acima.
2.  **Copiar Assets**: Trazer imagens e ícones do `frontend` web para a pasta `mobile/assets`.
3.  **Desenvolver Telas**:
    *   **Login/Cadastro**: Adaptar o formulário HTML para `<View>` e `<TextInput>`.
    *   **Home (Mapa)**: Implementar o mapa interativo.
    *   **Solicitar Carona**: Criar modal ou tela para inserir destino e ver preço.
4.  **Integração**: Testar o fluxo completo com o backend Node.js rodando localmente.

Este plano garante que a versão mobile seja robusta, moderna e compartilhe a mesma lógica de negócios do backend recém-migrado.
