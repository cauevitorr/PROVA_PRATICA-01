import conn from "../config/conn.js";

const tabelaParticipantes = /*sql*/`
CREATE TABLE IF NOT EXISTS participantes(
    id_participante VARCHAR(60) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`
conn.query(tabelaParticipantes, (err, results, fields)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('Tabela [participantes] criada')
})

// Dados: { "nome": "Nome do Participante", "email": "email@exemplo.com" }