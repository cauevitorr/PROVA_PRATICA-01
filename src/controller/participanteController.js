import conn from "../config/conn.js"
import { v4 as uuidv4 } from "uuid"


export const register = async (request, response) => {
    const { nome, email } = request.body

    if (!nome) {
        response.status(400).json({ message: "O nome é obrigatório" })
        return
    }
    if (!email) {
        response.status(400).json({ message: "O email é obrigatório" })
        return
    }

    const checkSql = /*sql*/`SELECT * FROM participantes WHERE ?? = ?`
    const checkSqlData = ["email", email]
    conn.query(checkSql, checkSqlData, async (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ message: "Erro ao buscar participante" })
            return
        }

        if (data.length > 0) {
            response.status(404).json({ message: "Participante já cadastrado" })
            return
        }

        //criar participante
        const id = uuidv4()
        const inertInto = /*sql*/` INSERT INTO participantes(??, ??, ??) values(?, ?, ?)`
        const insertData = [
            "id_participante",
            "nome",
            "email",
            id,
            nome,
            email
        ]

        conn.query(inertInto, insertData, (err) => {
            if (err) {
                console.error(err)
                response.status(500).json({ er: "Erro ao cadastrar participante" })
                return
            }
            console.log(id)
            response.status(201).json({message: "Participante cadastrado"})

        })

    })
}