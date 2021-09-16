// // const redis = require("redis");
// // require('dotenv').config();

// // const Redis_client = redis.createClient({
// //     host: process.env.REDIS_HOST,
// //     port: process.env.REDIS_PORT
// // });

// // Redis_client.on("connect",(error)=>{console.log("Redis_Client Connected")})


// //a função set recebe como parametro o nome ou id do usuario e  conteudo do agendamento
// async function set(key, msg){
//     await Redis_client.set(key, JSON.stringify(msg), "EX", 7200);
//     console.log("Rascunho salvo no redis")
// }

// //funçao que faz a busca no redis pelo agendamento da pessoa que o nome ou id foi passado por parametro
// function get(key){
//     let arr = []
//         Redis_client.get(key,function(err,reply){
//         if(reply!= null){
//             arr.push(reply)
//             console.log(arr)
//         }
//         else{ console.log("chave não encontrada")}

//             return arr
//     })
// }
// module.exports = {
//     set,
//     get
// }