import { Router } from "express";
import {inscricoes} from "../controller/inscricaoController.js"

const router = Router()

router.post("/inscrever", inscricoes)

export default router