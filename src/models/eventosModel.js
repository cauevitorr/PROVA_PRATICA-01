import conn from "../config/conn.js";

const tabelaEventos = /*sql*/`
CREATE TABLE IF NOT EXISTS agenda(
    id_evento VARCHAR(60) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    data_evento DATE NOT NULL,
    palestrantesID VARCHAR(124) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`
conn.query(tabelaEventos, (err, results, fields)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('Tabela [agenda] criada')
})

// Dados: { "titulo": "Título do Evento", "data": "2024-08-15", "palestrantesId": [1, 3] }