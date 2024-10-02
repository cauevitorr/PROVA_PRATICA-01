import conn from "../config/conn.js";

const tabelaInscricoes = /*sql*/`
CREATE TABLE IF NOT EXISTS inscricoes(
    id_inscricao VARCHAR(60) PRIMARY KEY,
    participanteID VARCHAR(60) NOT NULL,
    eventoID VARCHAR(60) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(participanteID) REFERENCES participantes(id_participante),
    FOREIGN KEY(eventoID) REFERENCES agenda(id_evento)
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