import { Router } from "express";
import {getMeusEventos, register} from "../controller/participanteController.js"

const router = Router()

router.post("/participantes/registrar", register )
router.get("/meus-eventos/:id", getMeusEventos)

export default router