
import { Router } from "express";
import { criarOferta, listarOfertas, reservarCarona } from "../controllers/caronaController.js";

const router = Router();

// Rota para motorista criar oferta
router.post("/ofertar", criarOferta);

// Rota para passageiro buscar ofertas
router.get("/disponiveis", listarOfertas);

// Rota para passageiro reservar uma carona (pagamento simulado)
router.post("/reservar", reservarCarona);

export default router;
