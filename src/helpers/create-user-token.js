import jwt from "jsonwebtoken" 

const createUserToken = async (palestrante, request, response)=>{
 //Criar o token
 const token = jwt.sign({
  id: palestrante.id_palestrante,
  nome: palestrante.nome
 },
 "SenhaSuperSegura",//Senha de criptografia
 )
 //Retornar o token
 response.status(200).json({
  message:"Você está autenticado",
  token: token,
  palestranteId: palestrante.id_palestrante
 })
}

export default createUserToken
