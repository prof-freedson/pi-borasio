import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Implementar verificação de token JWT aqui
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Acesso não autorizado" });
    }

    try {
        // Verificar token
        // const decoded = jwt.verify(token, config.jwtSecret);
        // req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};
