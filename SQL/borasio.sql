-- Criação do schema
CREATE SCHEMA IF NOT EXISTS carona;

-- ENUMs
CREATE TYPE carona.tipo_usuario AS ENUM ('passageiro', 'motorista', 'admin');
CREATE TYPE carona.status_corrida AS ENUM ('pendente', 'em_andamento', 'finalizada', 'cancelada');
CREATE TYPE carona.status_pagamento AS ENUM ('pendente', 'aprovado', 'recusado', 'reembolsado');
CREATE TYPE carona.tipo_acessibilidade AS ENUM (
    'deficiencia_motora',
    'deficiencia_visual',
    'deficiencia_auditiva',
    'idoso',
    'gravidez',
    'cadeirante'
);
CREATE TYPE carona.tipo_evento_sistema AS ENUM (
    'manutencao',
    'atualizacao',
    'erro_sistema',
    'notificacao_geral'
);

-- Tabela de Usuários
CREATE TABLE carona.usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo carona.tipo_usuario NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Passageiros
CREATE TABLE carona.passageiros (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    preferencias VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES carona.usuarios(id) ON DELETE CASCADE
);

-- Tabela de Motoristas
CREATE TABLE carona.motoristas (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    cnh VARCHAR(20),
    veiculo VARCHAR(100),
    marca VARCHAR(50),
    modelo VARCHAR(50),
    cor VARCHAR(30),
    ar_condicionado BOOLEAN,
    combustivel VARCHAR(20),
    assentos INT,
    FOREIGN KEY (usuario_id) REFERENCES carona.usuarios(id) ON DELETE CASCADE
);

-- Tabela de Corridas
CREATE TABLE carona.corridas (
    id SERIAL PRIMARY KEY,
    passageiro_id INT NOT NULL,
    motorista_id INT NOT NULL,
    origem VARCHAR(255),
    destino VARCHAR(255),
    data_corrida TIMESTAMP,
    status carona.status_corrida,
    valor DECIMAL(10,2),
    FOREIGN KEY (passageiro_id) REFERENCES carona.passageiros(id) ON DELETE CASCADE,
    FOREIGN KEY (motorista_id) REFERENCES carona.motoristas(id) ON DELETE CASCADE
);

-- Tabela de Pagamentos
CREATE TABLE carona.pagamentos (
    id SERIAL PRIMARY KEY,
    corrida_id INT NOT NULL,
    valor_pago DECIMAL(10,2),
    data_pagamento TIMESTAMP,
    metodo_pagamento VARCHAR(50),
    status carona.status_pagamento,
    FOREIGN KEY (corrida_id) REFERENCES carona.corridas(id) ON DELETE CASCADE
);

-- Tabela de Eventos Culturais
CREATE TABLE carona.eventos_culturais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    descricao TEXT,
    data_evento TIMESTAMP,
    local VARCHAR(255)
);

-- Tabela de Chat
CREATE TABLE carona.chat (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    mensagem TEXT,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES carona.usuarios(id) ON DELETE CASCADE
);

-- Tabela de Desvios Inteligentes
CREATE TABLE carona.desvios_inteligentes (
    id SERIAL PRIMARY KEY,
    corrida_id INT NOT NULL,
    rota_alternativa VARCHAR(255),
    motivo VARCHAR(255),
    data_desvio TIMESTAMP,
    FOREIGN KEY (corrida_id) REFERENCES carona.corridas(id) ON DELETE CASCADE
);

-- Tabela de Rastreamento em Tempo Real
CREATE TABLE carona.rastreamento_tempo_real (
    id SERIAL PRIMARY KEY,
    corrida_id INT NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    data_registro TIMESTAMP,
    FOREIGN KEY (corrida_id) REFERENCES carona.corridas(id) ON DELETE CASCADE
);

-- Tabela de Avaliações
CREATE TABLE carona.avaliacoes (
    id SERIAL PRIMARY KEY,
    corrida_id INT NOT NULL,
    usuario_id INT NOT NULL,
    nota INT CHECK (nota BETWEEN 1 AND 5),
    comentario TEXT,
    data_avaliacao TIMESTAMP,
    FOREIGN KEY (corrida_id) REFERENCES carona.corridas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES carona.usuarios(id) ON DELETE CASCADE
);

-- Tabela de Notificações
CREATE TABLE carona.notificacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    mensagem TEXT,
    lida BOOLEAN DEFAULT FALSE,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES carona.usuarios(id) ON DELETE CASCADE
);

-- Tabela de Terminais Rurais
CREATE TABLE carona.terminais_rurais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    localizacao VARCHAR(255)
);

-- Tabela de Eventos do Sistema
CREATE TABLE carona.eventos_sistema (
    id SERIAL PRIMARY KEY,
    tipo_evento carona.tipo_evento_sistema,
    descricao TEXT,
    data_evento TIMESTAMP
);

-- Tabela de Preferências de Acessibilidade
CREATE TABLE carona.acessibilidade (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo_acessibilidade carona.tipo_acessibilidade,
    preferencias VARCHAR(100),
    FOREIGN KEY (usuario_id) REFERENCES carona.usuarios(id) ON DELETE CASCADE
);

-- Tabela de Administradores
CREATE TABLE carona.administradores (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    nivel_acesso VARCHAR(50),
    FOREIGN KEY (usuario_id) REFERENCES carona.usuarios(id) ON DELETE CASCADE
);

-- Usuários (admin, motorista, passageiro)
INSERT INTO carona.usuarios (nome, email, senha, tipo) VALUES
('Admin Principal', 'admin@email.com', 'admin123', 'admin'),
('João Motorista', 'joao@carona.com', 'senha123', 'motorista'),
('Maria Passageira', 'maria@carona.com', 'senha123', 'passageiro');

-- Administrador
INSERT INTO carona.administradores (usuario_id, nivel_acesso) VALUES
(1, 'superadmin');

-- Motorista
INSERT INTO carona.motoristas (usuario_id, cnh, veiculo, marca, modelo, cor, ar_condicionado, combustivel, assentos) VALUES
(2, '12345678900', 'ABC-1234', 'Toyota', 'Corolla', 'Prata', true, 'gasolina', 4);

-- Passageiro
INSERT INTO carona.passageiros (usuario_id, preferencias) VALUES
(3, 'Evitar ar-condicionado');

-- Evento cultural
INSERT INTO carona.eventos_culturais (nome, descricao, data_evento, local) VALUES
('Festival de Música', 'Festival com artistas locais.', '2025-10-15 19:00', 'Praça Central');

-- Corrida
INSERT INTO carona.corridas (passageiro_id, motorista_id, origem, destino, data_corrida, status, valor) VALUES
(1, 1, 'Rua A, 123', 'Rua B, 456', '2025-09-27 14:30', 'pendente', 25.00);

-- Pagamento
INSERT INTO carona.pagamentos (corrida_id, valor_pago, data_pagamento, metodo_pagamento, status) VALUES
(1, 25.00, '2025-09-27 14:40', 'pix', 'aprovado');

-- Chat
INSERT INTO carona.chat (usuario_id, mensagem) VALUES
(3, 'Olá, estou chegando no ponto de encontro.'),
(2, 'Perfeito! Estou a caminho.');

-- Desvio Inteligente
INSERT INTO carona.desvios_inteligentes (corrida_id, rota_alternativa, motivo, data_desvio) VALUES
(1, 'Rua C -> Rua D -> Rua B', 'Trânsito intenso na rota principal', '2025-09-27 14:35');

-- Rastreamento em Tempo Real
INSERT INTO carona.rastreamento_tempo_real (corrida_id, latitude, longitude, data_registro) VALUES
(1, -23.550520, -46.633308, '2025-09-27 14:32');

-- Avaliações
INSERT INTO carona.avaliacoes (corrida_id, usuario_id, nota, comentario, data_avaliacao) VALUES
(1, 3, 5, 'Motorista muito gentil e pontual!', '2025-09-27 15:00');

-- Notificações
INSERT INTO carona.notificacoes (usuario_id, mensagem) VALUES
(3, 'Sua corrida foi concluída com sucesso. Obrigado por usar o Carona+!');

-- Terminal Rural
INSERT INTO carona.terminais_rurais (nome, localizacao) VALUES
('Terminal Rural Norte', 'Estrada Municipal KM 15');

-- Evento do Sistema
INSERT INTO carona.eventos_sistema (tipo_evento, descricao, data_evento) VALUES
('manutencao', 'Manutenção preventiva do sistema de rastreamento', '2025-09-25 02:00');

-- Preferências de Acessibilidade
INSERT INTO carona.acessibilidade (usuario_id, tipo_acessibilidade, preferencias) VALUES
(3, 'deficiencia_visual', 'Precisa de ajuda para embarque');

select * from carona.usuarios

-- Passageiros: adicionando CPF, endereço e telefone
ALTER TABLE carona.passageiros
    ADD COLUMN cpf VARCHAR(14),
    ADD COLUMN endereco VARCHAR(255),
    ADD COLUMN telefone VARCHAR(20);

-- Motoristas: adicionando endereço, telefone e placa
ALTER TABLE carona.motoristas
    ADD COLUMN endereco VARCHAR(255),
    ADD COLUMN telefone VARCHAR(20),
    ADD COLUMN placa VARCHAR(10);

-- Passageiro Maria
UPDATE carona.passageiros
SET cpf = '123.456.789-00',
    endereco = 'Av. dos Holandeses, 500 - São Luís',
    telefone = '(98) 91234-5678'
WHERE usuario_id = 3;

-- Motorista João
UPDATE carona.motoristas
SET endereco = 'Rua das Palmeiras, 200 - São Luís',
    telefone = '(98) 97654-3210',
    placa = 'ABC1D23'
WHERE usuario_id = 2;

select * from carona.passageiros

select * from carona.motoristas

ALTER TABLE carona.motoristas
    DROP COLUMN veiculo;

ALTER TABLE carona.usuarios 
ALTER COLUMN tipo TYPE carona.tipo_usuario 
USING tipo::carona.tipo_usuario;

ALTER TABLE carona.usuarios
ALTER COLUMN tipo TYPE varchar(20);



ALTER TABLE carona.usuarios
ALTER COLUMN tipo TYPE varchar(20);

select * from carona.usuarios;

CREATE TABLE carona.oferta_carona (
    id_oferta SERIAL PRIMARY KEY,
    id_motorista INT NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_motorista) REFERENCES carona.usuarios(id)
);

INSERT INTO carona.oferta_carona (id_motorista, tipo) VALUES 
(1, 'geral'),
(2, 'grupo')

select * from carona.oferta_carona

CREATE TABLE carona.contatos (
    id_contato SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES carona.usuarios(id)
);

INSERT INTO carona.contatos (id_usuario, descricao) VALUES 
(1, 'Preciso de ajuda com minha conta.'),
(2, 'Gostaria de relatar um problema com uma corrida.');

-- Formulário página Contato
CREATE TABLE carona.formulario_contato(
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
mensagem TEXT NOT NULL,
data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



