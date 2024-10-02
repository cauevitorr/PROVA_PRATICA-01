import conn from "../config/conn.js"
import { v4 as uuidv4 } from "uuid"


export const criarEvento = async (request, response) => {
    const { titulo, data_evento, palestrantesID } = request.body

    if (!titulo) {
        response.status(400).json({ message: "O título é obrigatório" })
        return
    }
    if (!data_evento) {
        response.status(400).json({ message: "A data do evento é obrigatória" })
        return
    }
    if (!palestrantesID) {
        response.status(400).json({ message: "O id dos palestrantes é obrigatório" })
        return
    }

    const checkSql = /*sql*/`SELECT * FROM agenda WHERE ?? = ? AND ?? = ?`
    const checkSqlData = ["titulo", titulo, "data_evento", data_evento]
    conn.query(checkSql, checkSqlData, async (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ message: "Erro ao buscar evento" })
            return
        }

        if (data.length > 0) {
            response.status(404).json({ message: "Evento já registrado" })
            return
        }

        //criar evento
        const id = uuidv4()
        const inertInto = /*sql*/` INSERT INTO agenda(??, ??, ??, ??) values(?, ?, ?, ?)`
        const insertData = [
            "id_evento",
            "titulo",
            "data_evento",
            "palestrantesID",
            id,
            titulo,
            data_evento,
            palestrantesID,
        ]

        conn.query(inertInto, insertData, (err) => {
            if (err) {
                console.error(err)
                response.status(500).json({ er: "Erro ao registrar evento" })
                return
            }
            response.status(201).json({ message: "Evento registrado" })

        })

    })
}

export const getEventos = (request, response) => {    
    const sql = /*sql*/ `SELECT * FROM agenda`;
    conn.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro so buscar eventos" });
            return;
        }
        const eventos = data;
        response.status(200).json(eventos);
    });
};