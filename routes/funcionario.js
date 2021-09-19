const { application, Router } = require('express')
const usuario= require('../databases/postgres')
const postagens = require('../databases/mongo')
const express = require('express')
const router = express.Router()
const agenda = require('../databases/redis')



//gets
router.get('/UBS',(req,res)=>{
    res.render('funcionario/adminUBS')
})
router.get('/FuncPage', async (req,res)=>{
    const posts = await postagens.getPost()
    res.render('funcionario/funcionario' , {dados: req.session.login, posts: posts})

})
router.get('/TipoFuncionario',async (req,res)=>{
    const ubs = await usuario.getUbs()
    console.log(ubs)
    res.render('funcionario/cadastrar', {ubs: ubs})
})


router.get('/sair',(req,res)=>{
    req.session.login = null
    res.redirect('/paciente/')
})
router.get('/Agenda', async (req,res)=>{
   
    const arr = []
        await agenda.Redis_client.keys("*", function(err,reply){
        if(reply!= null){
            arr.push(reply)
            res.render("funcionario/verAgenda", {agd: reply})
        }
        
        else{ 
            console.log("Nenhum agendamento cadastrado func")
            res.render("funcionario/verAgenda")   }
           
      
    })
    
})
router.get('/AgendarPac',(req,res)=>{
    res.render('funcionario/adminAgenda')
})
router.get('/news',(req,res)=>{
    res.render("funcionario/adminNoticias")
})
router.get('/edit/:titulo',async (req,res)=>{
    posts = await postagens.getPostFilter(req.params.titulo)
    res.render("funcionario/editNoticias",{posts: posts})
})

//posts
router.post('/cadastro',(req,res)=>{
    if(req.body.senha == req.body.confirmSenha){
        const obj = {
            tipo: 'funcionario',
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            telefone: req.body.telefone,
            cpf: req.body.cpf,
            endereco: {
                rua: req.body.rua,
                bairro: req.body.bairro,
                cidade: req.body.cidade
            },
            nascimento: req.body.data,
            funcao: req.body.função,
            salario: req.body.salario,
            admissao: req.body.admissao
        }
        usuario.setNewUser(obj);

        res.redirect('FuncPage')
    }else{
        console.log("as senhas não batem")
    }
    
})

router.post("/postar",async(req,res)=>{
    const obj = {
        autor: req.session.login.nome,
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        data: postagens.setData()
    }
    postagens.addPost(obj)
    res.redirect('FuncPage')
})

router.get('/delete/:titulo',async (req,res)=>{
    const filtro = {titulo: req.params.titulo}
    await mongo.dellPost(filtro)
    console.log(filtro)
    res.redirect('FuncPage')
})

router.get('/Agenda/:nome',(req,res)=>{
    const nome = req.params.nome
    res.render('funcionario/verPaciente',{nome: nome})
})

router.post('/adicionarAgendamento',(req,res)=>{
     const obj = {
        tipo: req.body.tipo,
        titulo: req.body.motivo,
        descrição: req.body.descrição
    } 
    const key = req.body.nome;
    agenda.set(key, req.body.descrição)
    
    res.redirect('Agenda')
})



//map

/* const UBS = require("../controler");
    router.post("/pontos", UBS.createdDestiny);
    router.get("/destiny", UBS.getDestiny); */


module.exports = router