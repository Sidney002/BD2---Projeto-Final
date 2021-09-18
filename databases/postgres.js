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
     if (obj.tipo== "paciente") {

        const paciente = "INSERT INTO paciente (nome, cpf, datanasc, dataadmissao, cargo, salario) VALUES ($1, $2, $3, $4, $5, $6)"
        client.query(paciente,[obj.nome, obj.cpf, obj.senha, obj.email, obj.telefone, obj.rua, obj.bairro, obj.cidade, obj.nascimento, obj.funcao, obj.salario])
        console.log("Paciente cadastrado com sucesso!")
     } else {

        const funcionario = "INSERT INTO funcionario (nome, cpf, datanasc, dataadmissao, cargo, salario) VALUES ($1, $2, $3, $4, $5, $6)"
        client.query(funcionario,[obj.nome, obj.cpf, obj.senha, obj.email, obj.sus, obj.telefone, obj.sexo, obj.nascimento, obj.rua, obj.bairro, obj.cidade])
        console.log("Funcionario cadastrado com sucesso!")
     }
     
 }
 setNewUser();
 async function getUser(email) {
     const res = await client.query(`SELECT * FROM crudblog WHERE email=$1`,[email])
  
     if(res.rows.length > 0) {
         return res.rows[0]
     }else return null
 }
 async function getUserEmail(email) {
     const res = await client.query(`SELECT email FROM crudblog WHERE email=$1 LIMIT 1`,[email])
  
     if(res.rows.length > 0) {
         return res.rows[0]
     }else return null
 }
 async function getUserPassword(email) {
     const res =  await client.query(`SELECT senha FROM crudblog WHERE email=$1 LIMIT 1`,[email])
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