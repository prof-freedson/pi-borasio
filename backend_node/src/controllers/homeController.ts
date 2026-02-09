import type { Request, Response } from "express";
import prisma from "../services/prisma.js";

export const getHome = async (req: Request, res: Response) => {
    try {
        const result: any[] = await prisma.$queryRaw`SELECT version()`;
        const version = result[0]?.version || "Versão desconhecida";

        res.json({
            message: "API Backend Node.js rodando!",
            db_connection: "Sucesso!",
            db_version: version
        });
    } catch (error) {
        console.error("Erro ao conectar no banco:", error);
        res.status(500).json({
            message: "API Backend Node.js rodando!",
            db_connection: "Falha ao conectar no banco.",
            error: String(error)
        });
    }
};
