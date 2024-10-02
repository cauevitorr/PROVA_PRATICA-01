import { Router } from "express";
import {register, inscricoes} from "../controller/participanteController.js"

const router = Router()

router.post("/participantes/registrar", register )
router.get("/inscrever", inscricoes)

export default router