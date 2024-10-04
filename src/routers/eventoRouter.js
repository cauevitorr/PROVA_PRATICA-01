import { Router } from "express";
import { criarEvento, deleteEvento, getEventos, putEvento } from "../controller/eventoController.js"

const router = Router()

router.post("/criar", criarEvento)
router.get("/agenda", getEventos)
router.put("/editar", putEvento)
router.delete("/cancelar", deleteEvento)

export default router