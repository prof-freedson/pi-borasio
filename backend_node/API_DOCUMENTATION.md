# Documentação da API Borasiô

Abaixo estão listados todos os endpoints disponíveis na API do projeto Backend Node, baseados no arquivo `routes/index.ts` e seus sub-roteadores.

## URL Base
`https://backend-node-vd88.vercel.app` (Produção)
`http://localhost:3000` (Local)

---

## 1. Autenticação (`/auth`)
Rotas para cadastro e autenticação de usuários.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/auth/register/passageiro` | Cadastra um novo passageiro. |
| `POST` | `/auth/register/motorista` | Cadastra um novo motorista. |

---

## 2. Administrativo e Usuários (`/admin`)
Rotas para gerenciamento e consulta de usuários (passageiros e motoristas).

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/admin/passengers` | Lista todos os passageiros cadastrados. |
| `GET` | `/admin/drivers` | Lista todos os motoristas cadastrados. |
| `GET` | `/admin/users/:id` | Retorna os detalhes de um usuário específico pelo ID. |
| `PUT` | `/admin/users/:id` | Atualiza os dados de um usuário existente. |
| `DELETE` | `/admin/users/:id` | Remove um usuário do sistema. |

---

## 3. Caronas (`/caronas`)
Rotas para oferta e busca de caronas.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/caronas/ofertar` | (Motorista) Cria uma nova oferta de carona. |
| `GET` | `/caronas/disponiveis` | (Passageiro) Lista as caronas disponíveis para reserva. |
| `POST` | `/caronas/reservar` | (Passageiro) Reserva uma carona (simula pagamento). |

---

## 4. Geral (`/`)
Rotas de utilidade geral e verificação de saúde da API.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Retorna uma mensagem de boas-vindas ou status da API. |
