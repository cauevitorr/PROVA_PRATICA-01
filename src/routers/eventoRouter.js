import { Router } from "express";
import { criarEvento, getEventos } from "../controller/eventoController.js"

const router = Router()

router.post("/criar", criarEvento)
router.get("/agenda", getEventos)

export default router