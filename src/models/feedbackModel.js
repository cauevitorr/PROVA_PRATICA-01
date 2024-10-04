import conn from "../config/conn.js";

const tabelaFeedBack = /*sql*/`
CREATE TABLE IF NOT EXISTS feedback(
    id_feedback VARCHAR(60) PRIMARY KEY,
    participanteID VARCHAR(60),
    eventoID VARCHAR(60),
    nota INT NOT NULL,
    comentario VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`
conn.query(tabelaFeedBack, (err, results, fields)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('Tabela [feedback] criada')
})

//Dados: { "participanteId": 2, "eventoId": 1, "nota": 5, "comentario": "Excelente evento!" }