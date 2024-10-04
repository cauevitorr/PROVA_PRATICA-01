import conn from "../config/conn.js";

const tabelaInscricoes = /*sql*/`
CREATE TABLE IF NOT EXISTS inscricoes(
    id_inscricao VARCHAR(60) PRIMARY KEY,
    participanteID VARCHAR(60),
    eventoID VARCHAR(60),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`
conn.query(tabelaInscricoes, (err, results, fields)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('Tabela [inscricoes] criada')
})

//Dados: { "participanteId": 2, "eventoId": 1 }