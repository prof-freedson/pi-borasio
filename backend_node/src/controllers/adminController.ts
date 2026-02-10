
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
