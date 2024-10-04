import conn from "../config/conn.js"
import { v4 as uuidv4 } from "uuid"


export const criarEvento = (request, response) => {
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

export const putEvento = (request, response) => {
    try {

        const { id_evento, titulo, data_evento, palestrantesID } = request.body

        if (!id_evento) {
            return response.status(400).json({ message: "o id_evento é obrigatório" })
        }
        if (!titulo) {
            return response.status(400).json({ message: "o titulo é obrigatório" })
        }
        if (!data_evento) {
            return response.status(400).json({ message: "o data_evento é obrigatória" })
        }
        if (!palestrantesID) {
            return response.status(400).json({ message: "o palestranteID é obrigatório" })
        }

        //1º verificar se o evento existe
        const checkSql = /*sql*/`SELECT * FROM agenda WHERE ?? = ?`
        const checkSqlData = ["id_evento", id_evento]
        conn.query(checkSql, checkSqlData, (err, data) => {
            if (err) {
                return response.status(500).json('Erro ao verificar evento para Update')
            }
            if (data.length === 0) {
                return response.status(404).json('evento não encontrado')
            }

            //2º evitar usuarios com titulo iguais
            const checkTituloSql = /*sql*/`SELECT * FROM agenda WHERE ?? = ? AND ?? = ?`
            const checkTituloSqlData = ['titulo', titulo, 'id_evento', id_evento]
            conn.query(checkTituloSql, checkTituloSqlData, (err, data) => {
                if (err) {
                    return response.status(500).json('Erro ao verificar titulo')
                }
                if (data.length > 0) {
                    return response.status(409).json('Título já está em uso')
                }

                // 3º atualizar o evento 
                const updateSql = /*sql*/`UPDATE agenda SET ? WHERE ?? = ?`
                const updateSqlData = [{ titulo, data_evento, palestrantesID }, "id_evento", id_evento]
                conn.query(updateSql, updateSqlData, (err) => {
                    if (err) {
                        return response.status(500).json({ message: 'Erro ao atualizar evento' })
                    }
                    response.status(200).json({ message: 'evento atualizado' })
                })
            })
        })

    } catch (error) {
        console.error(error)
        response.status(500).json({ message: 'Erro interno do servidor' })
    }
}

export const deleteEvento = (request, response) => {
    const { id_evento } = request.body;

    const deleletSql = /*sql*/ `DELETE FROM agenda WHERE id_evento = "${id_evento}"`;

    conn.query(deleletSql, (err, info) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao deletar evento" });
            return;
        }

        if (info.affectedRows === 0) {
            response.status(200).json({ mesage: "evento deletado" });
        }
    });
};



