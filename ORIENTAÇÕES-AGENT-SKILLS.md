# Guia Avançado de Engenharia de Agentes: Padrão Google AntiGravity

Este documento serve como a "Source of Truth" para a implementação de Agent Skills no projeto, incorporando as melhores práticas das arquiteturas de Agentes (Anthropic, OpenAI, Google Deepmind).

## 1. Filosofia: Agentic Engineering no Ecossistema AntiGravity

O "Google AntiGravity" opera sob o princípio de **Ferramentas Estendidas**. Um agente padrão possui ferramentas genéricas (`view_file`, `run_command`). "Skills" são **pacotes de especialização** que ensinam o agente a realizar tarefas complexas de domínio específico, reduzindo alucinação e garantindo conformidade.

### Principais Diferenças (vs. Prompt Simples)
1.  **Determinismo**: Skills delegam lógica complexa para scripts (Python/Bash) em vez de pedir para o LLM "pensar" na lógica inteira.
2.  **Encapsulamento**: O Agente vê apenas a "Assinatura" da skill (Descrição/Frontmatter). As instruções detalhadas são carregadas apenas quando necessário (Lazy Loading / Progressive Disclosure).
3.  **Idempotência**: Uma boa skill pode ser executada múltiplas vezes sem quebrar o sistema (verifica existência de arquivos antes de criar).

---

## 2. Arquitetura do Diretório `.agent`

A estrutura de pastas deve ser rigorosa para que o parser do agente (Sistema Operacional do Agente) consiga indexar as habilidades corretamente.

```text
.agent/
├── config.yaml          # Configurações globais (opcional: linters padrão, env vars)
├── rules/               # Regras de contexto (.cursorrules equivalent)
│   └── stack-rules.md   # "Sempre use Tailwind", "Sempre trate erros com try/catch"
├── workflows/           # Sequências lineares de tarefas
│   └── deploy-dev.md    # Passo a passo para deploy
└── skills/              # Habilidades Atômicas e Reutilizáveis
    ├── [category]-[action]/
    │   ├── SKILL.md             # O cérebro da skill (Prompt System)
    │   ├── scripts/             # Os músculos da skill (Execução Determinística)
    │   │   ├── generator.py
    │   │   └── validator.sh
    │   └── templates/           # O esqueleto (Arquivos base)
    │       └── component.tsx.hbs
```

---

## 3. Implementação Detalhada das Skills

Abaixo, a implementação aprofundada das Skills identificadas, com foco em segurança de tipos, tratamento de erros e integração com o VS Code (Cursor/AntiGravity).

### A. Skill: Backend Resource Factory (`new-backend-resource`)

Focada em **Padronização Arquitetural**. No Backend, a consistência entre Controller, Service e Route é vital.

**Caminho:** `.agent/skills/new-backend-resource/SKILL.md`
```markdown
---
name: new-backend-resource
description: Gera um novo recurso CRUD completo (Controller, Service, Rotas) na API Node.js. Use quando o usuário pedir "Crie o CRUD de Usuários" ou "Adicione entidade de Carros".
version: 2.0.0
author: System Architect
---

# New Backend Resource

Esta habilidade orquestra a criação de arquivos boilerplate para garantir a arquitetura em camadas.

## Variáveis Necessárias
*   `ResourceName` (string): Nome da entidade em PascalCase (ex: `RideHistory`).

## Procedimento

1.  **Verificação de Pré-condições**:
    *   Verifique se a pasta `backend_node/src` existe.

2.  **Execução do Gerador**:
    *   Execute o script Python que gera os arquivos físicos.
    ```bash
    python .agent/skills/new-backend-resource/scripts/scaffold_resource.py [ResourceName]
    ```

3.  **Wiring (Ligação)**:
    *   O script **não** altera o arquivo `server.ts` automaticamente (para evitar corrupção por regex complexo).
    *   **VOCÊ (Agente)** deve ler `backend_node/src/server.ts` e adicionar:
        1.  O import da rota.
        2.  A linha `app.use('/resource', router)`.

4.  **Validação**:
    *   Rode `npm run build` (ou verifique com linter) para garantir que não há erros de importação.
```

**Script Inteligente:** `.agent/skills/new-backend-resource/scripts/scaffold_resource.py`
*(Versão robusta com verificação de existência)*

```python
import sys
import os

def create_file_safe(path, content):
    if os.path.exists(path):
        print(f"SKIP: {{path}} already exists.")
        return False
    
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"CREATE: {{path}}")
    return True

def main():
    if len(sys.argv) < 2:
        print("Error: Missing ResourceName argument.")
        sys.exit(1)

    resource_name = sys.argv[1] # PascalCase ex: RideHistory
    kebab_name = ''.join(['-' + c.lower() if c.isupper() else c for c in resource_name]).lstrip('-') # kebab-case ex: ride-history
    
    base_path = os.path.join("backend_node", "src")
    
    # Templates definidos aqui para evitar dependência externa
    templates = {
        f"controllers/{{kebab_name}}.controller.ts": f"""...conteúdo do controller...""",
        f"services/{{kebab_name}}.service.ts": f"""...conteúdo do service...""",
        f"routes/{{kebab_name}}.routes.ts": f"""...conteúdo da rota..."""
    }

    # Execução
    created_count = 0
    for rel_path, content in templates.items():
        full_path = os.path.join(base_path, rel_path)
        if create_file_safe(full_path, content):
            created_count += 1
            
    if created_count > 0:
        print(f"Successfully scaffolded {{resource_name}}.")
    else:
        print("No files created (resource likely exists).")

if __name__ == "__main__":
    main()
```

---

### B. Skill: Mobile Route Builder (`new-mobile-screen`)

Focada em **Expo Router & NativeWind**. O desafio aqui é garantir que o arquivo seja criado no local certo para a navegação do Expo funcionar.

**Caminho:** `.agent/skills/new-mobile-screen/SKILL.md`
```markdown
---
name: new-mobile-screen
description: Cria uma nova tela no aplicativo mobile. Inteligente o suficiente para lidar com rotas dinâmicas (ex: [id]) e grupos ((tabs)).
version: 2.0.0
---

# New Mobile Screen Generator

## Análise de Rota
1.  Interprete o pedido do usuário para determinar o caminho da rota.
    *   "Tela de Login" -> `app/login.tsx` (ou `app/(auth)/login.tsx` se houver grupos)
    *   "Detalhes da Corrida" -> `app/ride/[id].tsx`

## Execução
Execute o script passando o caminho *relativo a app/*:
```bash
python .agent/skills/new-mobile-screen/scripts/create_screen.py "ride/[id]"
```

## Pós-Execução (Ação do Agente)
1.  Se a nova tela precisar aparecer em uma *Tab Bar*, edite `app/(tabs)/_layout.tsx`.
2.  Importe componentes visuais básicos se o usuário pediu (ex: botões, inputs).
```

---

### C. Skill: Prisma Database Sync (`sync-database`)

Focada em **Segurança Operacional**. Manipular banco de dados é arriscado; a skill força um "Checklist de Voo".

**Caminho:** `.agent/skills/sync-database/SKILL.md`
```markdown
---
name: sync-database
description: Executa o ciclo seguro de migração do banco de dados (Schema -> Format -> Validate -> Scrape -> Migrate).
version: 2.0.0
---

# Prisma Safe Migration Protocol

ESTA SKILL NÃO USA SCRIPTS PYTHON. Ela orquestra comandos do sistema (CLI) em ordem estrita.

## Protocolo

1.  **Format & Validate** (Obrigatório antes de qualquer coisa)
    *   Garanta que o schema é válido antes de tentar migrar.
    ```powershell
    cd backend_node
    npx prisma format
    npx prisma validate
    ```
    *   *Se falhar*: PARE. Corrija o schema com o usuário.

2.  **Migration em Dev**
    *   Crie a migração com nome descritivo.
    ```powershell
    npx prisma migrate dev --name "{{migration_name}}"
    ```

3.  **Regeneração do Cliente** (Opcional, mas recomendado)
    *   Geralmente `migrate dev` já faz isso, mas force para garantir types atualizados no editor.
    ```powershell
    npx prisma generate
    ```

4.  **Notificação**
    *   Informe o usuário: "Banco de dados sincronizado. Types do Prisma atualizados."
```

---

## 4. Best Practices: Como Escrever Suas Próximas Skills

Ao criar novas Skills para este projeto, siga estas regras de ouro extraídas da documentação do AntiGravity/Codex:

### 1. Progressive Disclosure (Divulgação Progressiva)
Não coloque *tudo* no `SKILL.md`. Se a instrução for muito longa, crie um arquivo `INSTRUCTIONS.md` na pasta da skill e peça para o agente lê-lo apenas se necessário. Mantenha o `SKILL.md` leve para não poluir a janela de contexto do LLM.

### 2. Separação de Preocupações (Separation of Concerns)
*   **LLM (Agente)**: Ótimo para entender intenção, editar código existente, fazer "wiring" (conectar peças).
*   **Scripts (Python/Bash)**: Ótimos para scaffolding (criar arquivos do zero), regex complexos, manipulação de arquivos em massa.
*   **Regra**: Se a tarefa envolve criar mais de 2 arquivos com conteúdo padrão, faça um script. Se envolve editar lógica de negócio variável, deixe o Agente fazer.

### 3. Human-in-the-Loop Aprovals
Para operações destrutivas (ex: `DROP TABLE`, `rm -rf`), a Skill deve explicitamente incluir um passo: "Pergunte ao usuário por confirmação antes de executar este comando".

### 4. Contexto do Projeto
Sempre use caminhos absolutos baseados na raiz do workspace.
*   Errado: `cd src && touch file.ts`
*   Certo: `create_file "backend_node/src/file.ts"`

## 6. Exemplos de Prompts para Criação de Skills (Meta-Prompts)

Para expandir o repertório do seu agente, você deve instruí-lo a criar novas skills. Abaixo estão 3 exemplos de **Prompts que você (Usuário) deve enviar ao Agente** para gerar skills robustas em cada camada do projeto.

### 1. Frontend Scope (Next.js + Tailwind)
**Objetivo:** Automatizar a criação de componentes atômicos.

> **Prompt do Usuário:**
> "Atue como Engenheiro Frontend Sênior. Analise a estrutura de componentes em `frontend/src/components`. Quero que você crie uma nova Skill chamada `new-web-component`.
>
> **Requisitos da Skill:**
> 1.  Deve aceitar o nome do componente (ex: `ButtonPrimary`) e o tipo (ex: `ui`, `form`, `layout`).
> 2.  Deve criar uma pasta com o nome do componente contendo:
>     *   `index.tsx`: O componente React com tipagem TS e classes Tailwind.
>     *   `scripts/generator.py`: Script Python para criar os arquivos e pastas (evite alucinação).
> 3.  **Regra de Ouro**: O componente deve ser exportado como default.
>
> Gere a estrutura completa em `.agent/skills/new-web-component`."

### 2. Backend Scope (Node.js + Patterns)
**Objetivo:** Padronizar a implementação de Testes Unitários.

> **Prompt do Usuário:**
> "Atue como QA Lead. Crie uma Skill chamada `add-backend-test` para o projeto `backend_node`.
>
> **Comportamento da Skill:**
> 1.  O agente deve ler um arquivo Service existente (ex: `UserService.ts`).
> 2.  Deve propor um arquivo de teste correspondente em `backend_node/tests/unit/` usando Jest.
> 3.  **Diferencial**: A Skill deve ler o arquivo `SKILL.md` atual para entender as regras de mock do Prisma.
>
> Por favor, escreva o `SKILL.md` dessa nova habilidade focando em diretrizes de 'Given-When-Then'."

### 3. Mobile Scope (Expo Router)
**Objetivo:** Criar Hooks customizados padronizados.

> **Prompt do Usuário:**
> "Crie uma Skill `new-mobile-hook` focada no diretório `mobile/hooks`.
>
> **Especificações:**
> 1.  A skill deve criar um arquivo `use[Nome].ts`.
> 2.  Deve incluir um template básico com `useState` e `useEffect` do React.
> 3.  Use um script Python simples em `scripts/scaffold_hook.py` para garantir que o arquivo seja criado no caminho correto.
>
> Defina o Frontmatter do `SKILL.md` com um gatilho claro: 'Use esta skill quando o usuário pedir para extrair lógica de UI para um custom hook'."

---

## 7. Exemplos de Invocação de Tarefas (Como usar as Skills)

Uma vez que as skills estão criadas (como sugerido na seção 6), o agente passará a "escutar" intenções específicas. Abaixo estão exemplos de como você, como usuário, deve solicitar tarefas para ativar essas skills automaticamente.

### 1. Invocando Frontend Skill (`new-web-component`)
**Cenário:** Você precisa de um novo card de perfil no design system.

> **Seu Prompt:**
> "Preciso de um novo componente visual. Crie um `ProfileCard` na categoria `ui`. Ele deve ter uma imagem de avatar e um nome."
>
> **O que o Agente fará:**
> *   Detecta a intenção de criar componente.
> *   Lê `.agent/skills/new-web-component/SKILL.md`.
> *   Executa: `python .agent/skills/new-web-component/scripts/generator.py ProfileCard ui`.
> *   Edita o `index.tsx` gerado para adicionar a imagem e texto solicitados.

### 2. Invocando Backend Skill (`add-backend-test`)
**Cenário:** Você acabou de implementar o `RideService` e quer garantir qualidade.

> **Seu Prompt:**
> "Agora que o `RideService` está pronto, gere os testes unitários para ele cobrindo o caso de sucesso e erro de validação."
>
> **O que o Agente fará:**
> *   Detecta a intenção de teste.
> *   Aciona `add-backend-test`.
> *   Lê `backend_node/src/services/RideService.ts` para entender os métodos.
> *   Cria `backend_node/tests/unit/RideService.test.ts` usando o padrão Jest definido na skill.

### 3. Invocando Mobile Skill (`new-mobile-hook`)
**Cenário:** A lógica de fetch de corridas está poluindo o componente visual.

> **Seu Prompt:**
> "A lógica de buscar corridas no `IndexScreen` está muito complexa. Refatore criando um custom hook chamado `useRideHistory`."
>
> **O que o Agente fará:**
> *   Detecta intenção de refatoração/criação de hook.
> *   Aciona `new-mobile-hook`.
> *   Executa script de scaffold para criar `mobile/hooks/useRideHistory.ts`.
> *   Move o código de `useEffect` e `useState` da tela para o novo hook.

---

## 8. Próximos Passos para o Usuário

1.  Crie a pasta `.agent` na raiz do projeto `pi-borasio`.
2.  Copie os códigos acima para seus respectivos arquivos.
3.  Reinicie a sessão do agente (ou use `/reload`) para que ele indexe as novas habilidades.
