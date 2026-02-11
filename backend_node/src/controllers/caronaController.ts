
import type { Request, Response } from "express";
import prisma from "../services/prisma.js";

// Criação de nova oferta de carona
export const criarOferta = async (req: Request, res: Response) => {
    try {
        const {
            motoristaId, // Idealmente viria do token de auth, mas por enquanto aceito no body
            tipo,
            origem,
            destino,
            dataHora, // string ISO ou timestamp
            vagas,
            valor,
            veiculo,
            placa,
            arCondicionado,
            observacoes,
            telefone
        } = req.body;

        // Validação básica
        if (!motoristaId || !origem || !destino || !dataHora || !valor) {
            res.status(400).json({ error: "Campos obrigatórios faltando." });
            return;
        }

        // Criar no banco
        const novaOferta = await prisma.oferta_carona.create({
            data: {
                motoristaId: parseInt(motoristaId),
                tipo,
                origem,
                destino,
                dataHora: new Date(dataHora),
                vagas: parseInt(vagas),
                valor: parseFloat(valor.toString().replace('R$', '').replace(',', '.').trim()), // Tratamento básico de string R$
                veiculo,
                placa,
                arCondicionado: Boolean(arCondicionado),
                observacoes,
                telefone,
            }
        });

        res.status(201).json(novaOferta);

    } catch (error) {
        console.error("Erro ao criar oferta de carona:", error);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
};

// Listar ofertas disponíveis (para quem busca carona)
export const listarOfertas = async (req: Request, res: Response) => {
    try {
        const { origem, destino, data } = req.query;

        // Construir filtros
        const where: any = {};

        if (origem) {
            where.origem = { contains: String(origem), mode: 'insensitive' };
        }
        if (destino) {
            where.destino = { contains: String(destino), mode: 'insensitive' };
        }
        // Se quiser filtrar por data exata ou maior que hoje
        // onde dataHora >= now()
        where.dataHora = {
            gte: new Date() // Apenas caronas futuras
        };

        const ofertas = await prisma.oferta_carona.findMany({
            where,
            include: {
                motorista: {
                    select: {
                        nome: true,
                        motoristas: {
                            select: {
                                // avaliacoes: true // Removido temporariamente pois avaliacoes nao existe no schema atual
                            }
                        }
                    }
                }
            },
            orderBy: {
                dataHora: 'asc'
            }
        });

        res.json(ofertas);

    } catch (error) {
        console.error("Erro ao listar ofertas:", error);
        res.status(500).json({ error: "Erro interno ao buscar ofertas." });
    }
};
