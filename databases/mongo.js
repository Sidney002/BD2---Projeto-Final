const { MongoClient, ObjectId } = require('mongodb');
//sintax = mongodb://bancourl/porta
const Client = new MongoClient('mongodb://172.19.0.2/27017}',
    {useUnifiedTopology: true});
//Funções de postagens    
    async function getPost(){
        try{
            await Client.connect()
            .then(()=>{console.log("app conectado ao mongodb")})
            .catch((err)=>{console.log("não foi possivel conectar ao mongoDB: " +err)})
            const database = Client.db('projeto')
            const user = database.collection('Posts')
         
            //.fin() retorna um obj, o foreach retorna um array apenas com as informações que vamos usar
         
            let arr = []
            await user.find().sort({data: "desc"}).forEach(  (item)=>{ arr.push(item)  })
            return arr
        }finally{
            await Client.close()
        }
    }
    async function getPostFilter(filter){
        try{
            await Client.connect()
            .then(()=>{console.log("app conectado ao mongodb")})
            .catch((err)=>{console.log("não foi possivel conectar ao mongoDB: " +err)})
            const database = Client.db('projeto')
            const user = database.collection('Posts')
         
            //.fin() retorna um obj, o foreach retorna um array apenas com as informações que vamos usar
         
            let arr = []
            await user.find({titulo: filter}).sort({data: "desc"}).forEach(  (item)=>{ arr.push(item) })
         
            return arr
         
        }finally{
            await Client.close()
        }
    }
    //função para atualizar mensagens
    async function updatePost(filter,titulo,conteudo){
        try{
            await Client.connect()
            .then(()=>{console.log("app conectado ao mongodb")})
            .catch((err)=>{console.log("não foi possivel conectar ao mongoDB: " +err)})
            //conectando a collection e database passados por parametros
            const user = Client.db('projeto').collection('Posts')
         
         
            await user.updateOne({titulo: filter},{$set: {titulo: titulo,conteudo: conteudo}} , (req, res) => {
                console.log("Agendamento alterado")
            })
        }finally{
            await Client.close()
        }
    }
    //a função de adicionar agendamentos 
    async function addPost(obj){
     
        try{
            await Client.connect()
            .then(()=>{console.log("app conectado ao mongodb")})
            .catch((err)=>{console.log("não foi possivel conectar ao mongoDB: " +err)})
            //conectando a collection e database passados por parametros
            const user = Client.db('projeto').collection('Posts')
            await user.insertOne(obj)
            .then(console.log("Postagem realizada com sucesso"))
            .catch((err)=>{console.log("não foi possivel realizar a postagem: " +err)})
        }finally{
            //await Client.close()
            console.log("hello word");
        }
    }
    //mesma coisa, função de deletar mensagem
    //o filtro que vai ser passado por parametro sera = titulo = titulo da mensagem
    //  dellPser({Titulo: 'boa noite'})
    async function dellPost(id){
        try{
            await Client.connect()
            .then(()=>{console.log("app conectado ao mongodb")})
            .catch((err)=>{console.log("não foi possivel conectar ao mongoDB: " +err)})
            //conectando a collection e database passados por parametros
            const user = Client.db('projeto').collection('Posts')
            await user.deleteOne(id)
            .then(console.log('usuario removido'))
            .catch((err)=>{console.log("não foi possivel remover o usuario: " + err)})
         
        }finally{
            Client.close()
        }
    }
    const data = new Date()
        setData = ()=>{
            let dia = data.getDate()
            let mes = data.getMonth()
            let ano = data.getFullYear()
            let hora = data.getHours()
            let minutos = data.getMinutes()
            let dt = dia + "/" + mes + "/"+ ano + "  as  "+ hora+":"+minutos
         
            console.log(dt) 
            return dt     
        }
module.exports = {
    Client,
    MongoClient,
    addPost,
    getPost,
    dellPost,
    updatePost,
    getPostFilter,
    setData
}