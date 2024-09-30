import conn from "../config/conn.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import jwt from "jsonwebtoken"

//helper
import createUserToken from "../helpers/create-user-token.js"

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
            //criar token
            //passar toekn para o front-end
            const palestranteSQL = /*sql*/` SELECT * FROM palestrantes WHERE ?? = ?`
            const palestranteData = ["id_palestrante", id]
            conn.query(palestranteSQL, palestranteData, async (err, data) => {
                if(err) {
                    console.error(err)
                    response.status(500).json({ message: "Erro ao procurar palestrante" })
                    return
                }
                const palestrante = data[0] 
                try {
                    await createUserToken
                } catch(error) {
                    console.error(error)
                    response.status(500).json({ message: "Palestrante cadastrado" })
                }
            })
            response.status(201).json({message: "Palestrante cadastrado"})

        })

    })
}

export const getPalestrantes = (request, response)=>{
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
