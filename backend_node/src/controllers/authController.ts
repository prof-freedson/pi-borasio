
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../services/prisma.js";
import { z } from "zod";

// Validadores Zod para garantir que os dados chegam no formato esperado
const passengerSchema = z.object({
    nome: z.string().min(3),
    email: z.string().email(),
    senha: z.string().min(6),
    cpf: z.string().min(11).optional(),
    endereco: z.string().optional(),
    telefone: z.string().optional(),
});

const driverSchema = z.object({
    nome: z.string().min(3),
    email: z.string().email(),
    senha: z.string().min(6),
    cnh: z.string().min(10),
    endereco: z.string().optional(),
    telefone: z.string().optional(),
    veiculoMarca: z.string(),
    veiculoModelo: z.string(),
    veiculoPlaca: z.string(),
    veiculoCor: z.string(),
    veiculoCombustivel: z.string(),
    veiculoAssentos: z.string().or(z.number()), // Frontend manda string as vezes
    veiculoArCondicionado: z.string().or(z.boolean()), // "sim"/"não" ou boolean
});

export const registerPassenger = async (req: Request, res: Response) => {
    try {
        const data = passengerSchema.parse(req.body); // Validação básica

        // Verificar se email já existe
        const existingUser = await prisma.usuarios.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            return res.status(400).json({ error: "E-mail já cadastrado" });
        }

        const hashedPassword = await bcrypt.hash(data.senha, 10);

        // Transação para criar usuário e passageiro atomicamente
        const result = await prisma.$transaction(async (tx) => {
            const newUser = await tx.usuarios.create({
                data: {
                    nome: data.nome,
                    email: data.email,
                    senha: hashedPassword,
                    tipo: "passageiro",
                },
            });

            const newPassenger = await tx.passageiros.create({
                data: {
                    usuario_id: newUser.id,
                    cpf: data.cpf || null,
                    endereco: data.endereco || null,
                    telefone: data.telefone || null,
                },
            });

            return { user: newUser, passenger: newPassenger };
        });

        res.status(201).json({
            message: "Passageiro cadastrado com sucesso",
            user: {
                id: result.user.id,
                nome: result.user.nome,
                email: result.user.email,
                tipo: result.user.tipo,
            },
        });
    } catch (error: any) {
        console.error("Erro no cadastro de passageiro:", error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.issues });
        }
        res.status(500).json({ error: "Erro interno no servidor" });
    }
};

export const registerDriver = async (req: Request, res: Response) => {
    try {
        const data = driverSchema.parse(req.body);

        const existingUser = await prisma.usuarios.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            return res.status(400).json({ error: "E-mail já cadastrado" });
        }

        const hashedPassword = await bcrypt.hash(data.senha, 10);

        // Converter campos do frontend
        const hasAirConditioning =
            data.veiculoArCondicionado === "sim" || data.veiculoArCondicionado === true;

        // Assentos pode vir como string "4" ou número 4
        const seats = typeof data.veiculoAssentos === 'string'
            ? parseInt(data.veiculoAssentos, 10)
            : data.veiculoAssentos;

        const result = await prisma.$transaction(async (tx) => {
            const newUser = await tx.usuarios.create({
                data: {
                    nome: data.nome,
                    email: data.email,
                    senha: hashedPassword,
                    tipo: "motorista",
                },
            });

            const newDriver = await tx.motoristas.create({
                data: {
                    usuario_id: newUser.id,
                    cnh: data.cnh || null,
                    endereco: data.endereco || null,
                    telefone: data.telefone || null,
                    marca: data.veiculoMarca || null,
                    modelo: data.veiculoModelo || null,
                    placa: data.veiculoPlaca || null,
                    cor: data.veiculoCor || null,
                    combustivel: data.veiculoCombustivel || null,
                    assentos: isNaN(seats) ? 4 : seats, // Fallback safe
                    ar_condicionado: hasAirConditioning,
                },
            });

            return { user: newUser, driver: newDriver };
        });

        res.status(201).json({
            message: "Motorista cadastrado com sucesso",
            user: {
                id: result.user.id,
                nome: result.user.nome,
                email: result.user.email,
                tipo: result.user.tipo,
            },
        });
    } catch (error: any) {
        console.error("Erro no cadastro de motorista:", error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.issues });
        }
        res.status(500).json({ error: "Erro interno no servidor" });
    }
};
