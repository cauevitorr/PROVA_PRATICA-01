import conn from "../config/conn.js"
import { v4 as uuidv4 } from "uuid"


export const register = async (request, response) => {
    const { nome, expertise } = request.body

    if (!nome) {
        response.status(400).json({ message: "O nome é obrigatório" })
        return
    }
    if (!expertise) {
        response.status(400).json({ message: "A expertise  é obrigatória" })
        return
    }

    const checkSql = /*sql*/`SELECT * FROM palestrantes WHERE ?? = ? AND ?? = ? `
    const checkSqlData = ["nome", nome, "expertise", expertise]
    conn.query(checkSql, checkSqlData, async (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ message: "Erro ao buscar palestrante" })
            return
        }

        if (data.length > 0) {
            response.status(404).json({ message: "Palestrante já cadastrado" })
            return
        }

        //criar palestrante
        const id = uuidv4()
        const inertInto = /*sql*/` INSERT INTO palestrantes(??, ??, ??) values(?, ?, ?)`
        const insertData = [
            "id_palestrante",
            "nome",
            "expertise",
            id,
            nome,
            expertise
        ]

        conn.query(inertInto, insertData, (err) => {
            if (err) {
                console.error(err)
                response.status(500).json({ er: "Erro ao cadastrar palestrante" })
                return
            }
            response.status(201).json({ message: "Palestrante cadastrado" })

        })

    })
}

export const getPalestrantes = (request, response) => {
    const sql = /*sql*/ `SELECT * FROM palestrantes`;
    conn.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro so buscar palestrantes" });
            return;
        }
        const palestrantes = data;
        response.status(200).json(palestrantes);
    });
};
