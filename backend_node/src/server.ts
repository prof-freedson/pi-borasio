import { config } from "./config/config.js";
import app from "./app.js";

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Endereço do servidor: http://localhost:${PORT}`);
});
