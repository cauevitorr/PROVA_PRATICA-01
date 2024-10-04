import { Router } from "express";
import { feedback } from "../controller/feedBackController.js";

const router = Router()

router.post("/feedback", feedback)

export default router