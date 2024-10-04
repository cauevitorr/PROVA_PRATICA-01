import conn from "../config/conn.js"
import { v4 as uuidv4 } from "uuid"

export const inscricoes =  (request, response) => {
    const { participanteID, eventoID } = request.body

    if (!participanteID) {
        response.status(400).json({ message: "O participanteID é obrigatório" })
        return
    }
    if (!eventoID) {
        response.status(400).json({ message: "O email é obrigatório" })
        return
    }

    const checkSql = /*sql*/`SELECT * FROM inscricoes WHERE ?? = ? AND ?? = ?`
    const checkSqlData = ["participanteID", participanteID, "eventoID", eventoID]
    conn.query(checkSql, checkSqlData, async (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ message: "Erro ao buscar inscricao" })
            return
        }

        if (data.length > 0) {
            response.status(404).json({ message: "inscricao já cadastrada" })
            return
        }

        //criar participante
        const id = uuidv4()
        const inertInto = /*sql*/` INSERT INTO inscricoes(??, ??, ??) values(?, ?, ?)`
        const insertData = [
            "id_inscricao",
            "participanteID",
            "eventoID",
            id,
            participanteID,
            eventoID
        ]

        conn.query(inertInto, insertData, (err, data) => {
            if (err) {
                console.error(err)
                response.status(500).json({ er: "Erro ao cadastrar inscricao" })
                return
            }
            console.log(data)
            response.status(201).json({message: "inscricao cadastrado"})

        })

    })
}