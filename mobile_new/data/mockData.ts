
export const mockData = {
    usuarioLogado: {
        id: 1,
        nome: "João Passageiro",
        email: "joao@email.com",
        senha: "123",
        telefone: "(98) 98888-7777",
        tipo: "passageiro",
        saldo: 50.00
    },
    motoristas: [
        {
            id: 101,
            nome: "Carlos Silva",
            veiculo: "Toyota Corolla",
            placa: "ABC-1234",
            cor: "Prata",
            avaliacao: 4.8,
            foto: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 102,
            nome: "Ana Souza",
            veiculo: "Honda Civic",
            placa: "XYZ-9876",
            cor: "Preto",
            avaliacao: 4.9,
            foto: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 103,
            nome: "Mariana Almeida",
            veiculo: "Jeep Renegade",
            placa: "MAR-2024",
            cor: "Branco",
            avaliacao: 5.0,
            foto: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        {
            id: 104,
            nome: "José Ribeiro",
            veiculo: "S10 Cabine Dupla",
            placa: "RUR-5555",
            cor: "Prata",
            avaliacao: 4.7,
            foto: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        {
            id: 105,
            nome: "Grupo Viagem",
            veiculo: "Chevrolet Spin",
            placa: "GRP-9999",
            cor: "Prata",
            avaliacao: 4.9,
            foto: "https://randomuser.me/api/portraits/men/12.jpg"
        }
    ],
    ofertasCaronas: [
        // GERAL
        {
            id: 1,
            motoristaId: 101,
            tipo: "geral",
            origem: "UFMA",
            destino: "Terminal da Cohab",
            dataHora: "2026-02-12T18:00:00",
            vagas: 3,
            valor: 5.50
        },
        {
            id: 2,
            motoristaId: 102,
            tipo: "geral",
            origem: "Shopping da Ilha",
            destino: "Renascença",
            dataHora: "2026-02-12T19:00:00",
            vagas: 2,
            valor: 8.00
        },
        // ILHA (Rotas turísticas ou inter-bairros complexas)
        {
            id: 3,
            motoristaId: 103,
            tipo: "ilha",
            origem: "Centro Histórico",
            destino: "Praia do Calhau",
            dataHora: "2026-02-13T09:00:00",
            vagas: 4,
            valor: 12.00
        },
        {
            id: 4,
            motoristaId: 101,
            tipo: "ilha",
            origem: "Ponta d'Areia",
            destino: "Araçagi",
            dataHora: "2026-02-13T10:30:00",
            vagas: 3,
            valor: 15.00
        },
        // EVENTO
        {
            id: 5,
            motoristaId: 102,
            tipo: "evento",
            origem: "Terminal Cohama",
            destino: "Ceprama (São João)",
            dataHora: "2026-06-24T19:00:00",
            vagas: 4,
            valor: 20.00
        },
        // RURAL
        {
            id: 6,
            motoristaId: 104,
            tipo: "rural",
            origem: "Feira da Cidade Operária",
            destino: "Zona Rural de São Luís",
            dataHora: "2026-02-14T06:00:00",
            vagas: 3,
            valor: 10.00
        },
        // GRUPO (Vans ou carros grandes)
        {
            id: 7,
            motoristaId: 105,
            tipo: "grupo",
            origem: "Rodoviária",
            destino: "Aeroporto",
            dataHora: "2026-02-15T14:00:00",
            vagas: 6,
            valor: 6.50
        }
    ],
    pagamento: {
        cartoesSalvos: [
            { id: 1, final: "4242", bandeira: "Visa", validade: "12/28" }
        ]
    }
};
