
import { Router } from "express";
import { criarOferta, listarOfertas } from "../controllers/caronaController.js";

const router = Router();

// Rota para motorista criar oferta
router.post("/ofertar", criarOferta);

// Rota para passageiro buscar ofertas
router.get("/disponiveis", listarOfertas);

export default router;
