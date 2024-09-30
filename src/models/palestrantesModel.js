import conn from "../config/conn.js";

const tabelaPalestrantes = /*sql*/`
CREATE TABLE IF NOT EXISTS palestrantes(
    id_palestrante VARCHAR(60) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    expertise VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`
conn.query(tabelaPalestrantes, (err, results, fields)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('Tabela [palestrantes] criada')
})

//Dados: { "nome": "Nome do Palestrante", "expertise": "Área de Especialização" }