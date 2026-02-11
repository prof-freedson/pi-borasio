
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
        // Correção de tipagem para req.query
        const origem = req.query.origem as string | undefined;
        const destino = req.query.destino as string | undefined;

        // Construir filtros
        const where: any = {};

        if (origem) {
            where.origem = { contains: origem, mode: 'insensitive' };
        }
        if (destino) {
            where.destino = { contains: destino, mode: 'insensitive' };
        }

        where.dataHora = {
            gte: new Date() // Apenas caronas futuras
        };

        // Verifica se há vagas disponíveis
        where.vagas = {
            gt: 0
        };

        const ofertas = await prisma.oferta_carona.findMany({
            where,
            include: {
                motorista: {
                    select: {
                        nome: true,
                        motoristas: {
                            select: {
                                // Se tiver avaliações no futuro
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


// Reservar uma vaga na carona (Transação de Pagamento Simulado)
export const reservarCarona = async (req: Request, res: Response) => {
    try {
        const { ofertaId, passageiroId, metodoPagamento, tokenCartao } = req.body;

        if (!ofertaId || !passageiroId) {
            res.status(400).json({ error: "ID da oferta e passageiro são obrigatórios." });
            return;
        }

        // SIMULAÇÃO DE PAGAMENTO
        // Se for crédito, verificamos o token (cartão fictício)
        if (metodoPagamento === 'credito' && tokenCartao !== 'tok_visa_4242') {
            res.status(402).json({ error: "Pagamento Recusado pela Operadora." });
            return;
        }

        // Iniciar transação no banco de dados para garantir consistência
        const resultado = await prisma.$transaction(async (tx) => {
            // 1. Buscar a oferta e bloquear a linha (se possível) ou verificar vagas novamente
            const oferta = await tx.oferta_carona.findUnique({
                where: { id: parseInt(ofertaId) }
            });

            if (!oferta) {
                throw new Error("Oferta não encontrada.");
            }

            if (oferta.vagas <= 0) {
                throw new Error("Não há mais vagas disponíveis nesta carona.");
            }

            // 2. Decrementar Vaga
            await tx.oferta_carona.update({
                where: { id: parseInt(ofertaId) },
                data: { vagas: { decrement: 1 } }
            });

            // 3. Criar registro na tabela de Corridas (Confirmando a participação do passageiro)
            const novaCorrida = await tx.corridas.create({
                data: {
                    passageiro_id: parseInt(passageiroId),
                    motorista_id: oferta.motoristaId,
                    origem: oferta.origem,
                    destino: oferta.destino,
                    data_corrida: oferta.dataHora,
                    valor: oferta.valor,
                    status: 'CONFIRMADA'
                }
            });

            // 4. Registrar o Pagamento
            await tx.pagamentos.create({
                data: {
                    corrida_id: novaCorrida.id,
                    valor_pago: oferta.valor,
                    metodo_pagamento: metodoPagamento,
                    data_pagamento: new Date(),
                    status: 'APROVADO'
                }
            });

            return novaCorrida;
        });

        res.status(200).json({
            message: "Reserva confirmada com sucesso!",
            corrida: resultado
        });

    } catch (error: any) {
        console.error("Erro ao reservar carona:", error);
        if (error.message === "Não há mais vagas disponíveis nesta carona.") {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Erro ao processar reserva." });
        }
    }
};
