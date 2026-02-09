# Plano Mestre de Implementação de Agent Skills: Sistema Profissional

Este documento define a arquitetura, padrões e a biblioteca de "Skills" (Habilidades) para os agentes de IA que atuarão no projeto Borasio (Frontend Next.js, Backend Node.js, Mobile Expo).

O objetivo é transformar tarefas repetitivas em micro-processos determinísticos de alta qualidade, seguindo o padrão **Agent Skills** (Google Antigravity / Anthropic).

---

## 1. Protocolo de Arquitetura de Skills

### Estrutura de Diretórios
Todas as skills devem residir na raiz do repositório, seguindo estritamente esta hierarquia:

```text
agent/
└── skills/
    ├── [nome-da-skill]/
    │   ├── SKILL.md          # OBRIGATÓRIO: Cérebro da skill
    │   ├── examples/         # OBRIGATÓRIO: 1-Shot learning (Exemplos de saída perfeita)
    │   ├── scripts/          # OPCIONAL: Scripts de automação (.ts, .sh, .py)
    │   └── resources/        # OPCIONAL: Templates (.ejs, .txt), Schemas, Dicionários
```

### Anatomia do Arquivo `SKILL.md`
Este arquivo é o prompt de sistema que isola o contexto da IA para aquela tarefa específica. Deve conter:

1.  **YAML Frontmatter**: Metadados para indexação.
2.  **Descrição da Tarefa**: O que deve ser feito.
3.  **Inputs Necessários**: O que o agente deve buscar antes de começar.
4.  **Regras de Ouro**: Restrições inegociáveis (ex: "Nunca use `any` no TypeScript").
5.  **Fluxo de Trabalho Detalhado**: Algoritmo passo-a-passo.

---

## 2. Catálogo de Skills (Implementação)

Abaixo está o detalhamento técnico das skills necessárias para cobrir o ciclo de vida do desenvolvimento.

### Categoria A: Meta-Skills (Automação da Automação)

#### 1. `skill-creator`
*   **Descrição:** Gera a estrutura de arquivos para uma nova skill, garantindo que o padrão acima seja seguido.
*   **Pasta:** `agent/skills/skill-creator`
*   **Conteúdo do `SKILL.md`:**
    *   **Inputs:** Nome da nova skill (kebab-case), Descrição breve.
    *   **Fluxo:**
        1.  Verificar se `agent/skills/{nome}` já existe.
        2.  Criar diretório `agent/skills/{nome}`.
        3.  Criar subdiretórios `examples` e `scripts` (vazios, com .gitkeep).
        4.  Escrever `SKILL.md` usando um template padrão que incentiva a descrição detalhada de passos.
*   **Auxiliares (`resources/`):**
    *   `template-skill.md`: Um esqueleto pré-preenchido de skill.

---

### Categoria B: Backend (Node.js/Prisma/Express)

#### 2. `node-resource` (Scaffold de API)
*   **Descrição:** Cria todo o stack vertical (camadas) para uma nova entidade no backend.
*   **Pasta:** `agent/skills/node-resource`
*   **Conteúdo do `SKILL.md`:**
    *   **Inputs:** Nome do Recurso (Singular e Plural, ex: `Product`, `Products`).
    *   **Regras:** Usar Zod para validação. Seguir padrão Controller-Service.
    *   **Fluxo:**
        1.  Criar Schema de Validação em `src/schemas/{resource}.schema.ts`.
        2.  Criar Service (Lógica Prisma) em `src/services/{resource}.service.ts`.
        3.  Criar Controller (Req/Res) em `src/controllers/{resource}.controller.ts`.
        4.  Criar Rotas Express em `src/routes/{resource}.routes.ts`.
        5.  Registrar rota no arquivo principal de rotas.
*   **Exemplos (`examples/`):**
    *   `user.controller.ts`: Um controller "padrão ouro" com tratamento de erros.
    *   `user.service.ts`: Um service demonstrando injeção de dependência e chamadas Prisma.

#### 3. `prisma-migration`
*   **Descrição:** Gerencia a evolução do banco de dados de forma segura.
*   **Pasta:** `agent/skills/prisma-migration`
*   **Conteúdo do `SKILL.md`:**
    *   **Inputs:** Alteração desejada (ex: "Adicionar campo 'phone' na tabela Users").
    *   **Fluxo:**
        1.  Ler `prisma/schema.prisma`.
        2.  Editar o modelo adicionando o campo com tipo correto.
        3.  Executar comando `npx prisma format` para validar sintaxe.
        4.  Executar `npx prisma migrate dev --name {descrição_curta}`.
        5.  (Opcional) Executar `npx prisma generate` para atualizar tipagem do cliente.

#### 4. `socket-event-handler`
*   **Descrição:** Padroniza a criação de eventos em tempo real com Socket.io.
*   **Pasta:** `agent/skills/socket-event-handler`
*   **Conteúdo do `SKILL.md`:**
    *   **Inputs:** Nome do Evento (ex: `message:receive`), Doador de dados (Payload).
    *   **Fluxo:**
        1.  Definir interface do Payload em arquivo de tipos.
        2.  Criar handler isolado em `src/sockets/handlers/{evento}.handler.ts`.
        3.  Registrar handler no arquivo de inicialização do Socket.
*   **Exemplos (`examples/`):**
    *   `chat.handler.ts`: Exemplo de handler que valida dados e emite resposta.

#### 5. `mailer-template`
*   **Descrição:** Cria templates de e-mail e funções de envio.
*   **Pasta:** `agent/skills/mailer-template`
*   **Conteúdo do `SKILL.md`:**
    *   **Fluxo:**
        1.  Criar template HTML em `src/templates/emails/`.
        2.  Criar função de envio em `src/services/email.service.ts` usando `nodemailer`.
        3.  Configurar substituição de variáveis (handlebars ou string replace).

---

### Categoria C: Frontend & Mobile (Interface)

#### 6. `next-component` (Web)
*   **Descrição:** Cria componentes visuais reutilizáveis para o Next.js.
*   **Pasta:** `agent/skills/next-component`
*   **Conteúdo do `SKILL.md`:**
    *   **Regras:** Usar `interface Props`. Usar Tailwind CSS. Ser Cliente Component (`"use client"`) apenas se necessário.
    *   **Fluxo:**
        1.  Criar arquivo chamando `src/components/{Categoria}/{Nome}.tsx`.
        2.  Exportar componente nomeado (não default).
*   **Exemplos (`examples/`):**
    *   `Card.tsx`: Exemplo de componente funcional limpo e tipado.

#### 7. `expo-screen` (Mobile)
*   **Descrição:** Cria telas navegáveis para o app Expo.
*   **Pasta:** `agent/skills/expo-screen`
*   **Conteúdo do `SKILL.md`:**
    *   **Regras:** Usar NativeWind (`className`). Compatibilidade com Expo Router.
    *   **Fluxo:**
        1.  Determinar rota baseada no nome (ex: `app/(tabs)/profile.tsx`).
        2.  Criar arquivo da tela com `SafeAreaView`.
        3.  Configurar `Stack.Screen` para título dinâmico.

#### 8. `form-builder`
*   **Descrição:** Constrói formulários complexos automaticamente.
*   **Pasta:** `agent/skills/form-builder`
*   **Conteúdo do `SKILL.md`:**
    *   **Inputs:** Schema Zod ou Model do Prisma de referência. Título do Form.
    *   **Fluxo:**
        1.  Analisar campos (tipo, obrigatório/opcional).
        2.  Gerar componente React usando `react-hook-form` e `zod-resolver`.
        3.  Mapear tipos de inputs (text -> Input, boolean -> Switch/Checkbox, enum -> Select).
        4.  Adicionar mensagens de erro visuais.

#### 9. `animation-wrapper`
*   **Descrição:** Adiciona camadas de animação a componentes existentes.
*   **Pasta:** `agent/skills/animation-wrapper`
*   **Conteúdo do `SKILL.md`:**
    *   **Inputs:** Arquivo alvo, Tipo de animação (Fade, Slide, Scale).
    *   **Fluxo:**
        1.  Importar biblioteca (Framer Motion no Next, Reanimated no Expo).
        2.  Envelopar o retorno JSX com o componente animado (ex: `<motion.div>`).
        3.  Aplicar variantes de animação pré-definidas.

---

### Categoria D: Integração & "Cola"

#### 10. `api-bridge-gen`
*   **Descrição:** Conecta o Frontend ao Backend gerando funções de fetch.
*   **Pasta:** `agent/skills/api-bridge-gen`
*   **Conteúdo do `SKILL.md`:**
    *   **Inputs:** Arquivo de rota do backend (para análise).
    *   **Fluxo:**
        1.  Identificar método (GET, POST), URL e tipos de Body/Response.
        2.  Criar hook customizado no frontend `src/hooks/api/use{Recurso}.ts` (usando React Query ou Fetch direto).
        3.  Garantir tipagem correta de entrada e saída.

#### 11. `zod-share` (Sincronização de Tipos)
*   **Descrição:** Compartilha contratos entre back e front.
*   **Pasta:** `agent/skills/zod-share`
*   **Fluxo:**
    1.  Identificar schemas Zod no backend.
    2.  Copiar ou gerar pacote compartilhado para o frontend, garantindo que a validação no cliente seja idêntica à do servidor.

---

### Categoria E: Qualidade & Documentação

#### 12. `unit-test-gen`
*   **Descrição:** Gera testes unitários para lógica de negócios e componentes.
*   **Pasta:** `agent/skills/unit-test-gen`
*   **Conteúdo do `SKILL.md`:**
    *   **Inputs:** Arquivo de código fonte.
    *   **Fluxo:**
        1.  Analisar exports do arquivo.
        2.  Criar arquivo `.test.ts` ou `.spec.ts` adjacente.
        3.  Gerar casos de teste para: "Caminho Feliz", "Erros Comuns", "Bordas".
*   **Exemplos (`examples/`):**
    *   Exemplo de teste Jest com Mock de banco de dados.

#### 13. `sentry-guard`
*   **Descrição:** Blinda código crítico com monitoramento.
*   **Pasta:** `agent/skills/sentry-guard`
*   **Fluxo:**
    1.  Identificar funções assíncronas propensas a falha.
    2.  Envelopar bloco em `try/catch`.
    3.  No `catch`, adicionar `Sentry.captureException(error)`.

#### 14. `doc-updater`
*   **Descrição:** Mantém a documentação viva.
*   **Pasta:** `agent/skills/doc-updater`
*   **Fluxo:**
    1.  Ler alterações recentes (diff git).
    2.  Atualizar `README.md` ou documentação de API se houver mudança pública.
