import "dotenv/config"
import express from "express"
import cors from "cors"

//conexão com o banco de dados
import conn from "./config/conn.js"

//importação de modulos
import "./models/palestrantesModel.js"
import "./models/eventosModel.js"
import "./models/participanteModel.js"
import "./models/inscricoesMode.js"

//importação das rotas 
import palestranteRouter from "./routers/palestranteRouter.js"
import eventoRouter from "./routers/eventoRouter.js"
import participanteRouter from "./routers/participanteRouter.js"
import incricoesRouter from "./routers/inscricoesRouter.js"


const PORT = 3333
const app = express()

//middlewares de ambientação
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//utilização do Router
app.use("/eventos", palestranteRouter)
app.use("/eventos", eventoRouter)
app.use("/eventos", participanteRouter)
app.use("/eventos", incricoesRouter)

app.use("*", (request, response) => {
    response.status(404).json({ massage: "Rotas não encontrada" })
})

app.listen(PORT, () => {
    console.log(`Servidor on port ${PORT}`)
})