import express from "express";
import {
  perfil,
  registrar,
  confirmar,
  autenticar,
} from "../controller/usuarioController.js";
const usuarioRouter = express.Router();

usuarioRouter.post("/", registrar);
usuarioRouter.get("/perfil", perfil);
usuarioRouter.get("/confirmar/:token", confirmar);
usuarioRouter.post("/login", autenticar);

export default usuarioRouter;
