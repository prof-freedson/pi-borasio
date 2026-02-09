import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas
app.use(routes);

// Error Middleware
app.use(errorHandler);

export default app;
