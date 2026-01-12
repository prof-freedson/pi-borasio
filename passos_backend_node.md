# Guia de Migração: Backend Java (Spring Boot) para Node.js (TypeScript)

Este guia detalha os passos necessários para refazer o backend do projeto `borasio`, migrando de Java com Spring Boot para Node.js com TypeScript. A arquitetura proposta busca manter a robustez do sistema atual utilizando tecnologias modernas e eficientes do ecossistema JavaScript.

## 1. Stack Tecnológica Sugerida

Para replicar as funcionalidades presentes no `pom.xml` e no código Java, utilizaremos a seguinte stack:

*   **Runtime**: Node.js (versão LTS).
*   **Linguagem**: TypeScript.
*   **Framework Web**: Express.js (o mais popular) ou Fastify (foco em performance). *Recomendação: Express pela vasta comunidade.*
*   **Banco de Dados**: PostgreSQL (já em uso).
*   **ORM (Object-Relational Mapping)**: Prisma ORM (excelente tipagem e fácil migração de bancos existentes).
*   **Autenticação**: JSON Web Tokens (JWT) + Bcrypt.
*   **Validação**: Zod (integração perfeita com TypeScript).
*   **Real-time (WebSockets)**: Socket.io.
*   **Filas/Mensageria**: BullMQ (Redis) ou amqplib (RabbitMQ).
*   **Pagamentos**: Stripe SDK.*Avaliar a possibilidade de substituição pelo OpenPix. Ver documentação em https://openpix.com.br/#home*
*   **Mapas/Geolocalização**: Google Maps API ou bibliotecas como `geolib`.

---

## 2. Comparativo de Dependências

Abaixo, o mapeamento do `pom.xml` para pacotes `npm`:

| Funcionalidade (Java) | Dependência Java | Equivalente Node.js (npm) |
| :--- | :--- | :--- |
| **Framework Web** | `spring-boot-starter-web` | `express`, `@types/express` |
| **JPA / Banco** | `spring-boot-starter-data-jpa`, `postgresql` | `prisma`, `@prisma/client` |
| **Segurança** | `spring-boot-starter-security` | `helmet`, `cors` |
| **Autenticação (JWT)** | `jjwt-api` | `jsonwebtoken`, `bcryptjs` |
| **WebSockets** | `spring-boot-starter-websocket` | `socket.io` |
| **Validação** | `spring-boot-starter-validation` | `zod` ou `express-validator` |
| **Filas (AMQP)** | `spring-boot-starter-amqp` | `amqplib` (RabbitMQ) ou `bullmq` (Redis) |
| **Cache (Redis)** | `spring-boot-starter-data-redis` | `ioredis` |
| **Email** | `spring-boot-starter-mail` | `nodemailer` |
| **Pagamentos** | `stripe-java` | `stripe` |
| **Logs/Monitoramento**| `sentry-spring-boot-starter` | `@sentry/node` |
| **Geolocalização** | `geodesy` | `geolib` |
| **Variáveis de Amb.** | `dotenv-java` | `dotenv` |

---

## 3. Passo a Passo da Implementação

### Passo 1: Inicialização do Projeto

Crie a pasta do projeto e inicie o Node.js com TypeScript.

```bash
mkdir backend-node
cd backend-node
npm init -y
npm install typescript ts-node @types/node nodemon --save-dev
npx tsc --init
```

**Configuração do `tsconfig.json` recomendada:**
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

### Passo 2: Configuração do Banco de Dados e Prisma

Aproveitaremos o arquivo `borasio.sql` existente. O Prisma possui uma funcionalidade incrível chamada **Introspection**, que lê o banco de dados e cria o esquema automaticamente.

1.  **Instale o Prisma:**
    ```bash
    npm install prisma --save-dev
    npm install @prisma/client
    npx prisma init
    ```

2.  **Configure o `.env`:**
    Aponte para o seu banco PostgreSQL local ou container Docker.
    ```env
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/carona?schema=carona"
    ```

3.  **Importe o Schema existente:**
    Certifique-se de que o banco de dados esteja rodando com o conteúdo de `borasio.sql` e execute:
    ```bash
    npx prisma db pull
    ```
    Isso preencherá automaticamente o arquivo `prisma/schema.prisma` com seus modelos `Usuario`, `Motorista`, `Corrida`, etc.

4.  **Ajuste os Enums:** O Prisma detectará os ENUMs (`tipo_usuario`, `status_corrida`) definidos no SQL.

5. **Implementação alternativa do banco de dados serverless com PostgreSQL no Neon:** Caso não seja possível utilizar o banco de dados local, é possível implementar o banco de dados serverless com PostgreSQL no Neon. Para isso, deve-se criar uma conta no Neon e configurar o banco de dados no arquivo `.env`.


### Passo 3: Estrutura de Pastas (Arquitetura)

Mantenha uma estrutura organizada, similar ao que você tinha em Java (Controller, Service), mas adaptada ao Node:

```
src/
├── config/         # Configurações (DB, Env, Stripe)
├── controllers/    # Lógica de entrada/saída (Req/Res)
├── middlewares/    # Auth, Validação, Tratamento de erros
├── routes/         # Definição das rotas da API
├── services/       # Regra de negócio pesada
├── utils/          # Funções auxiliares (Geo, Formatadores)
├── app.ts          # Configuração do Express
└── server.ts       # Ponto de entrada (Start server)
```

### Passo 4: Implementação das Funcionalidades Principais

Aqui está como traduzir os Controllers que analisamos:

#### A. Autenticação (`AuthController`)
Crie rotas para `/auth/login` e `/auth/register`.
*   **Java**: Usava `AuthService`.
*   **Node**: No `auth.service.ts`, use `bcrypt.compare` para validar senhas e `jwt.sign` para gerar o token.

#### B. Usuários e Perfis (`MotoristaController`, `PassageiroController`)
Crie CRUDs usando o Prisma Client.
*   **Exemplo Prisma**:
    ```typescript
    // services/motorista.service.ts
    const criarMotorista = async (data: CreateMotoristaDTO) => {
      return prisma.motoristas.create({
        data: {
          cnh: data.cnh,
          usuario: { connect: { id: data.usuarioId } }
        }
      });
    };
    ```

#### C. Corridas (`CorridaController`)
Esta é a parte central. Você precisará de endpoints para:
1.  **Solicitar Corrida** (POST): Cria registro com status `pendente`.
2.  **Aceitar Corrida** (PUT/PATCH): Motorista muda status para `em_andamento`.
3.  **Listar Corridas**: Filtros por status, passageiro ou motorista.

### Passo 5: Funcionalidades Avançadas e Real-time

#### WebSockets (Socket.io)
Para o **Chat** e **Rastreamento em Tempo Real**:
1.  Instale: `npm install socket.io`
2.  No `server.ts`, inicialize o Socket.io junto com o servidor HTTP.
3.  Crie eventos como `join_room` (para conectar passageiro e motorista na mesma sala da corrida), `send_location` (para atualizar latitude/longitude) e `new_message`.

#### Filas e Redis
Se o sistema usar processamento assíncrono (ex: enviar email de confirmação), configure o cliente Redis (`ioredis`) e filas com `bullmq`.

### Passo 6: Scripts e Comandos Utilitários

No `package.json`, adicione scripts para facilitar o desenvolvimento:

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/server.js",
  "dev": "nodemon src/server.ts"
}
```

---

## 4. Plano de Ação Imediato

1.  **Executar o Script SQL**: Garanta que o banco PostgreSQL esteja criado e povoado com o `SQL/borasio.sql`.
2.  **Setup Node**: Inicie o projeto Node.js e instale as dependências listadas.
3.  **Introspecção Prisma**: Gere o `schema.prisma` a partir do banco.
4.  **Migração Auth**: Comece implementando o Login/Registro para gerar Tokens JWT.
5.  **Migração Corridas**: Implemente o fluxo básico de solicitar e aceitar corridas.

Este roteiro cobre toda a estrutura encontrada no backend Java e fornece um caminho claro para a reconstrução em Node.js.
