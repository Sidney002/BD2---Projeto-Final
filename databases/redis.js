 const redis = require("redis");
 require('dotenv').config();
 const Redis_client = redis.createClient({
     host: process.env.REDIS_HOST,
     port: process.env.REDIS_PORT
 });
 Redis_client.on("connect",(error)=>{console.log("Redis_Client Connected")})


 //a função set recebe como parametro o nome ou id do usuario e  conteudo do agendamento
 async function set(key, obj){
     await Redis_client.set(key, JSON.stringify(obj), "EX", 7200);
     console.log("Agendamento concluido com sucesso")
 }

// //funçao que faz a busca no redis pelo agendamento da pessoa que o nome ou id foi passado por parametro
async function get(key){
    let arr =[ ] 
    await Redis_client.get(key,function(err,reply){
            
        arr.push(reply)
    if(reply!= null){
            console.log(reply)
            return reply
         }
    else{ console.log("Nenhum agendamento cadastrado")}
             return arr
     })
 }

async function getAll(){

        await Redis_client.keys("*", function(err,reply){
        if(reply!= null){
            
            console.log(reply)
            return reply
        }
        
        else{ 
            console.log("Nenhum agendamento cadastrado func")
            return null;
        }
           
      
    })
}

 module.exports = {
     set,
     get,
     getAll,
     Redis_client
 }