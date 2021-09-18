 require('dotenv').config();
 const {Client} = require('pg');
 //conectar ao banco
 const client = new Client({
     host: process.env.PG_HOST,
     port: process.env.PG_PORT,
     database: process.env.PG_DATABASE,
     user: process.env.PG_USER,
     password: process.env.PG_PASSWORD
 });
 //conectar cliente
 client.connect()
     .then(()=>console.log("Cliente Conectado"))
     .catch(err => console.log("err.stack"))
  
 async function setNewUser(obj){
     if (obj.tipo == "paciente") {
        console.log(obj.endereco.rua)
        const paciente = "INSERT INTO paciente (nome, cpf, senha, email, sus, telefone, sexo, nascimento, rua, bairro, cidade) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)"
        client.query(paciente,[obj.nome, obj.cpf, obj.senha, obj.email, obj.sus, obj.telefone, obj.sexo, obj.nascimento, obj.endereco.rua, obj.endereco.bairro, obj.endereco.cidade])
        console.log("Paciente cadastrado com sucesso!")

     } else {

        const funcionario = "INSERT INTO funcionario (nome, cpf, datanasc, dataadmissao, cargo, salario) VALUES ($1, $2, $3, $4, $5, $6)"
        client.query(funcionario,[obj.nome, obj.cpf, obj.senha, obj.email, obj.sus, obj.telefone, obj.sexo, obj.nascimento, obj.endereco.rua, obj.endereco.bairro, obj.endereco.cidade])
        console.log("Funcionario cadastrado com sucesso!")
     }
     
 }
 async function getUser(email) {
     const res = await client.query(`SELECT * FROM paciente WHERE email=$1`,[email])
  
     if(res.rows.length > 0) {
         return res.rows[0]
     }else return null
 }
 
 async function getUserEmail(email) {
     const res = await client.query(`SELECT email FROM paciente WHERE email=$1 LIMIT 1`,[email])
  
     if(res.rows.length > 0) {
         return res.rows[0]
     }else return null
 }
 async function getUserPassword(email) {
     const res =  await client.query(`SELECT senha FROM paciente WHERE email=$1 LIMIT 1`,[email])
     if(res.rows.length > 0) {
         return res.rows[0]
     }else return null
 }
 //exportar cliente
 module.exports = {
     client,
     getUserEmail,
     getUserPassword,
     setNewUser,
     getUser
 }
