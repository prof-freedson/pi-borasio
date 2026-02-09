import { PrismaClient } from "../generated/prisma/client.js";

// Criação do Prisma Client global
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Evita múltiplas instâncias no desenvolvimento (hot reload)
declare global {
    var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

export default prisma;
