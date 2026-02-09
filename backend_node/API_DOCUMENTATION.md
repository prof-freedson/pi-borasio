
# Documentação da API Borasio

Esta documentação descreve os endpoints disponíveis na API do backend Node.js (`backend_node`).

## Endpoints Públicos

### 1. Verificar Status da API (Home)
Verifica se a API está online e testa a conexão com o banco de dados.

*   **Rota:** `/`
*   **Método:** `GET`
*   **Autenticação:** Nenhuma
*   **Exemplo de Saída (200 OK):**
    ```json
    {
      "message": "API Backend Node.js rodando!",
      "db_connection": "Sucesso!",
      "db_version": "PostgreSQL 15.3 on x86_64-pc-linux-gnu..."
    }
    ```
*   **Exemplo de Erro (500 Internal Server Error):**
    ```json
    {
      "message": "API Backend Node.js rodando!",
      "db_connection": "Falha ao conectar no banco.",
      "error": "..."
    }
    ```

---

## Autenticação e Cadastro
Endpoints para registrar novos usuários no sistema.

### 2. Cadastrar Passageiro
Cria uma nova conta de usuário com perfil de passageiro.

*   **Rota:** `/auth/register/passageiro`
*   **Método:** `POST`
*   **Autenticação:** Nenhuma

#### **Corpo da Requisição (JSON):**
| Campo | Tipo | Obrigatório | Validação | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `nome` | string | Sim | Mín. 3 caracteres | Nome completo do passageiro |
| `email` | string | Sim | E-mail válido | E-mail único no sistema |
| `senha` | string | Sim | Mín. 6 caracteres | Senha de acesso |
| `cpf` | string | Não | Mín. 11 caracteres | CPF do passageiro (apenas números ou formatado) |
| `endereco` | string | Não | - | Endereço completo |
| `telefone` | string | Não | - | Telefone de contato |

**Exemplo de Requisição:**
```json
{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "senha": "senhaSegura123",
  "cpf": "12345678900",
  "endereco": "Rua das Flores, 123",
  "telefone": "(98) 99999-9999"
}
```

#### **Respostas:**
*   **201 Created:** Passageiro criado com sucesso.
    ```json
    {
      "message": "Passageiro cadastrado com sucesso",
      "user": {
        "id": 1,
        "nome": "João Silva",
        "email": "joao@exemplo.com",
        "tipo": "passageiro"
      }
    }
    ```
*   **400 Bad Request:** Erro de validação ou e-mail já existente.
    ```json
    { "error": "E-mail já cadastrado" }
    ```
    Ou lista de erros de validação (Zod).

---

### 3. Cadastrar Motorista
Cria uma nova conta de usuário com perfil de motorista e registra os dados do veículo.

*   **Rota:** `/auth/register/motorista`
*   **Método:** `POST`
*   **Autenticação:** Nenhuma

#### **Corpo da Requisição (JSON):**

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `nome` | string | Sim | Nome completo do motorista |
| `email` | string | Sim | E-mail único no sistema |
| `senha` | string | Sim | Senha (mín. 6 caracteres) |
| `cnh` | string | Sim | Número da CNH (mín. 10 chars) |
| `endereco` | string | Não | Endereço completo |
| `telefone` | string | Não | Telefone de contato |
| `veiculoMarca` | string | Sim | Marca do veículo (ex: Toyota) |
| `veiculoModelo` | string | Sim | Modelo do veículo (ex: Corolla) |
| `veiculoPlaca` | string | Sim | Placa do veículo (ex: ABC1234) |
| `veiculoCor` | string | Sim | Cor do veículo |
| `veiculoCombustivel` | string | Sim | Tipo de combustível |
| `veiculoAssentos` | string/number | Sim | Número de assentos (ex: "4" ou 4) |
| `veiculoArCondicionado`| string/boolean | Sim | "sim"/"não" ou `true`/`false` |

**Exemplo de Requisição:**
```json
{
  "nome": "Maria Oliveira",
  "email": "maria@motorista.com",
  "senha": "senhaForte123",
  "cnh": "12345678900",
  "telefone": "(11) 98765-4321",
  "veiculoMarca": "Honda",
  "veiculoModelo": "Civic",
  "veiculoPlaca": "XYZ5678",
  "veiculoCor": "Prata",
  "veiculoCombustivel": "Flex",
  "veiculoAssentos": 4,
  "veiculoArCondicionado": "sim"
}
```

#### **Respostas:**
*   **201 Created:** Motorista cadastrado com sucesso.
    ```json
    {
      "message": "Motorista cadastrado com sucesso",
      "user": {
        "id": 2,
        "nome": "Maria Oliveira",
        "email": "maria@motorista.com",
        "tipo": "motorista"
      }
    }
    ```
*   **400 Bad Request:** Erro de validação ou e-mail já existente.
    ```json
    { "error": "E-mail já cadastrado" }
    ```

---
