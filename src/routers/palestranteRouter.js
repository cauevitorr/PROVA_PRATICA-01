import { Router } from "express";
import { register, getPalestrantes } from "../controller/palestranteController.js"

const router = Router()

router.post("/register", register)
router.get("/palestrantes", getPalestrantes)

export default router