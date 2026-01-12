import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
    res.json({ message: "API Backend Node.js rodando!" });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Endereço do servidor: http://localhost:${PORT}`);
});
