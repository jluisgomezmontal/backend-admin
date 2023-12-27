import express from "express";
import dotenv from "dotenv";
import conectarDB from "./src/config/db.js";
import usuarioRouter from "./src/routes/usuarioRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

app.use("/api/usuarios", usuarioRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`servidor corriendo ${4000}`);
});
