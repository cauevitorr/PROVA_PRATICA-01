import conn from "../config/conn.js"
import { v4 as uuidv4 } from "uuid"

export const feedback =  (request, response) => {
    const { participanteID, eventoID, nota, comentario } = request.body

    if (!participanteID) {
        response.status(400).json({ message: "O participanteID é obrigatório" })
        return
    }
    if (!eventoID) {
        response.status(400).json({ message: "O eventoID é obrigatório" })
        return
    }
    if (!nota) {
        response.status(400).json({ message: "A nota é obrigatória" })
        return
    }


    //criar participante
    const id = uuidv4()
    const inertInto = /*sql*/` INSERT INTO feedback(??, ??, ??, ??, ??) values(?, ?, ?, ?, ?)`
    const insertData = [
        "id_feedback",
        "participanteID",
        "eventoID",
        "nota",
        "comentario",
        id,
        participanteID,
        eventoID,
        nota,
        comentario
    ]

    conn.query(inertInto, insertData, (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ er: "Erro ao registrar feedback" })
            return
        }
        console.log(data)
        response.status(201).json({ message: "feedback registrado" })

    })
}