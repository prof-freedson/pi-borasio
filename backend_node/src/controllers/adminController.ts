
import type { Request, Response } from "express";
import prisma from "../services/prisma.js";

export const getAllPassengers = async (req: Request, res: Response) => {
    try {
        const passengers = await prisma.passageiros.findMany({
            include: {
                usuarios: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        tipo: true,
                        data_cadastro: true,
                    },
                },
            },
        });
        res.json(passengers);
    } catch (error) {
        console.error("Erro ao buscar passageiros:", error);
        res.status(500).json({ error: "Erro interno ao buscar passageiros" });
    }
};

export const getAllDrivers = async (req: Request, res: Response) => {
    try {
        const drivers = await prisma.motoristas.findMany({
            include: {
                usuarios: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        tipo: true,
                        data_cadastro: true,
                    },
                },
            },
        });
        res.json(drivers);
    } catch (error) {
        console.error("Erro ao buscar motoristas:", error);
        res.status(500).json({ error: "Erro interno ao buscar motoristas" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
        res.status(400).json({ error: "ID inválido ou não fornecido" });
        return;
    }

    try {
        // Ao deletar o usuário, o ON DELETE CASCADE do banco deve deletar o perfil (passageiro ou motorista)
        await prisma.usuarios.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ error: "Erro interno ao deletar usuário" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    if (!id || typeof id !== "string") {
        res.status(400).json({ error: "ID inválido ou não fornecido" });
        return;
    }

    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
        res.status(400).json({ error: "ID deve ser um número válido" });
        return;
    }

    try {
        // Verificar o tipo do usuário
        const user = await prisma.usuarios.findUnique({
            where: { id: userId },
            include: { passageiros: true, motoristas: true }
        });

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado" });
            return;
        }

        const result = await prisma.$transaction(async (tx) => {
            // Atualiza dados base do usuário (nome, email)
            // Se a senha vier, deveria ser hasheada, mas por segurança vamos ignorar senha aqui por enquanto
            // ou assumir que o admin não troca senha por aqui.
            const updatedUser = await tx.usuarios.update({
                where: { id: userId },
                data: {
                    nome: data.nome,
                    email: data.email,
                }
            });

            // Atualiza dados específicos
            if (user.tipo === 'passageiro' || (user.passageiros && data.cpf)) {
                // É passageiro ou está tentando atualizar dados de passageiro
                await tx.passageiros.update({
                    where: { usuario_id: userId },
                    data: {
                        cpf: data.cpf,
                        telefone: data.telefone,
                        endereco: data.endereco,
                        preferencias: data.preferencias
                    }
                });
            } else if (user.tipo === 'motorista' || (user.motoristas && data.cnh)) {
                // É motorista
                await tx.motoristas.update({
                    where: { usuario_id: userId },
                    data: {
                        cnh: data.cnh,
                        telefone: data.telefone,
                        endereco: data.endereco,
                        marca: data.veiculoMarca,
                        modelo: data.veiculoModelo,
                        placa: data.veiculoPlaca,
                        cor: data.veiculoCor,
                        combustivel: data.veiculoCombustivel,
                        assentos: data.veiculoAssentos ? parseInt(data.veiculoAssentos.toString()) : null,
                        ar_condicionado: data.veiculoArCondicionado // boolean
                    }
                });
            }

            return updatedUser;
        });

        res.json({ message: "Usuário atualizado com sucesso", user: result });

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ error: "Erro interno ao atualizar usuário" });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
        res.status(400).json({ error: "ID inválido ou não fornecido" });
        return;
    }

    try {
        const user = await prisma.usuarios.findUnique({
            where: { id: parseInt(id) },
            include: {
                passageiros: true,
                motoristas: true
            }
        });

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado" });
            return;
        }

        res.json(user);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro interno ao buscar usuário" });
    }
};
