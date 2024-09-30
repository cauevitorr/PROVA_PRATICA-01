import "dotenv/config"
import express, { response } from "express"
import cors from "cors"

//conexão com o banco de dados
import conn from "./config/conn.js"

//importação de modulos
import "./models/palestrantesModel.js"

//importação das rotas 
import palestranteRouter from "./routers/palestranteRouter.js"


const PORT = 3333
const app = express()

//middlewares de ambientação
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//utilização do Router
app.use("/eventos", palestranteRouter)

app.use("*", (request, response) => {
    response.status(404).json({ massage: "Rotas não encontrada" })
})

app.listen(PORT, () => {
    console.log(`Servidor on port ${PORT}`)
})