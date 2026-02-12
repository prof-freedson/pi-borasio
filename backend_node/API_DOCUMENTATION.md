# Documentação da API Borasiô

Abaixo estão listados todos os endpoints disponíveis na API do projeto Backend Node, com exemplos de corpo de requisição e respostas esperadas.

## URL Base
*   **Produção:** `https://backend-node-vd88.vercel.app`
*   **Local:** `http://localhost:3000`

---

## 1. Autenticação (`/auth`)

### 1.1 Cadastrar Passageiro
Cria um novo usuário do tipo passageiro.

*   **Método:** `POST`
*   **Endpoint:** `/auth/register/passageiro`
*   **Corpo da Requisição (JSON):**
    ```json
    {
      "nome": "João Silva",
      "email": "joao@email.com",
      "senha": "senhaSegura123",
      "cpf": "12345678900", // Apenas números, 11 dígitos
      "telefone": "98999999999", // Apenas números
      "endereco": "Rua das Flores, 123 - Centro",
      "preferencias": "Gosto de conversar / Silêncio" // Opcional
    }
    ```
*   **Resposta Sucesso (201 Created):**
    ```json
    {
      "message": "Passageiro cadastrado com sucesso",
      "user": {
        "id": 1,
        "nome": "João Silva",
        "email": "joao@email.com",
        "tipo": "passageiro"
      }
    }
    ```

### 1.2 Cadastrar Motorista
Cria um novo usuário do tipo motorista.

*   **Método:** `POST`
*   **Endpoint:** `/auth/register/motorista`
*   **Corpo da Requisição (JSON):**
    ```json
    {
      "nome": "Maria Oliveira",
      "email": "maria@email.com",
      "senha": "senhaSegura123",
      "cnh": "1234567890", // Mínimo 10 caracteres
      "telefone": "98988888888",
      "endereco": "Av. Principal, 500",
      "veiculoMarca": "Toyota",
      "veiculoModelo": "Corolla",
      "veiculoPlaca": "ABC1D23",
      "veiculoCor": "Prata",
      "veiculoCombustivel": "Flex",
      "veiculoAssentos": 4, // Pode ser número ou string "4"
      "veiculoArCondicionado": true // Pode ser boolean ou string "sim"/"não"
    }
    ```
*   **Resposta Sucesso (201 Created):**
    ```json
    {
      "message": "Motorista cadastrado com sucesso",
      "user": {
        "id": 2,
        "nome": "Maria Oliveira",
        "email": "maria@email.com",
        "tipo": "motorista"
      }
    }
    ```

---

## 2. Administrativo e Usuários (`/admin`)

### 2.1 Listar Passageiros
Retorna todos os passageiros cadastrados.

*   **Método:** `GET`
*   **Endpoint:** `/admin/passengers`
*   **Resposta Sucesso (200 OK):**
    ```json
    [
      {
        "id": 1,
        "usuario_id": 1,
        "cpf": "12345678900",
        "usuarios": {
          "nome": "João Silva",
          "email": "joao@email.com"
        }
      }
    ]
    ```

### 2.2 Listar Motoristas
Retorna todos os motoristas cadastrados.

*   **Método:** `GET`
*   **Endpoint:** `/admin/drivers`
*   **Resposta Sucesso (200 OK):**
    ```json
    [
      {
        "id": 1,
        "usuario_id": 2,
        "cnh": "1234567890",
        "usuarios": {
          "nome": "Maria Oliveira",
          "email": "maria@email.com"
        }
      }
    ]
    ```

### 2.3 Detalhes do Usuário
Busca dados completos de um usuário (passageiro ou motorista) pelo ID.

*   **Método:** `GET`
*   **Endpoint:** `/admin/users/:id`
*   **Exemplo:** `/admin/users/1`
*   **Resposta Sucesso (200 OK):**
    ```json
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com",
      "tipo": "passageiro",
      "passageiros": [
        {
          "id": 1,
          "telefone": "98999999999",
          "endereco": "Rua das Flores, 123"
        }
      ],
      "motoristas": []
    }
    ```

---

## 3. Caronas (`/caronas`)

### 3.1 Ofertar Carona (Motorista)
Cria uma nova oferta de carona.

*   **Método:** `POST`
*   **Endpoint:** `/caronas/ofertar`
*   **Corpo da Requisição (JSON):**
    ```json
    {
      "motoristaId": 2,
      "tipo": "geral", // ou 'grupo'
      "origem": "UFMA",
      "destino": "Terminal da Cohab",
      "dataHora": "2026-02-15T08:00:00.000Z",
      "vagas": 3,
      "valor": 5.50,
      "veiculo": "Corolla Prata",
      "placa": "ABC1D23",
      "arCondicionado": true,
      "observacoes": "Saída do portão principal",
      "telefone": "98988888888"
    }
    ```

### 3.2 Listar Caronas Disponíveis
Busca caronas com filtros opcionais de origem e destino.

*   **Método:** `GET`
*   **Endpoint:** `/caronas/disponiveis`
*   **Query Params (Opcionais):** `?origem=UFMA&destino=Cohab`
*   **Resposta Sucesso (200 OK):**
    ```json
    [
      {
        "id": 1,
        "origem": "UFMA",
        "destino": "Terminal da Cohab",
        "dataHora": "2026-02-15T08:00:00.000Z",
        "valor": 5.50,
        "vagas": 3,
        "motorista": {
          "nome": "Maria Oliveira"
        }
      }
    ]
    ```

### 3.3 Reservar Carona (Passageiro)
Reserva uma vaga e simula o pagamento.

*   **Método:** `POST`
*   **Endpoint:** `/caronas/reservar`
*   **Corpo da Requisição (JSON):**
    ```json
    {
      "ofertaId": 1,
      "passageiroId": 1,
      "metodoPagamento": "credito", // ou 'pix', 'dinheiro'
      "tokenCartao": "tok_visa_4242" // Apenas para simulação de crédito
    }
    ```
*   **Resposta Sucesso (200 OK):**
    ```json
    {
      "message": "Reserva confirmada com sucesso!",
      "corrida": {
        "id": 10,
        "status": "CONFIRMADA",
        "valor": 5.50
      }
    }
    ```

---

## 4. Geral (`/`)

### 4.1 Health Check
Verifica se a API está online.

*   **Método:** `GET`
*   **Endpoint:** `/`
*   **Resposta:**
    ```json
    {
      "message": "API Borasiô rodando!",
      "version": "1.0.0"
    }
    ```
