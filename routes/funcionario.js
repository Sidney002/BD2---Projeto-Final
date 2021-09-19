const { application, Router } = require('express')
const usuario= require('../databases/postgres')
const postagens = require('../databases/mongo')
const express = require('express')
const router = express.Router()



//gets
router.get('/UBS',(req,res)=>{
    res.render('funcionario/adminUBS')
})
router.get('/FuncPage', async (req,res)=>{
    const posts = await postagens.getPost()
    res.render('funcionario/funcionario' , {dados: req.session.login, posts: posts})

})
router.get('/TipoFuncionario',(req,res)=>{
    res.render('funcionario/cadastrar')
})
router.get('/sair',(req,res)=>{
    req.session.login = null
    res.redirect('/paciente/')
})
router.get('/Agenda',(req,res)=>{
    res.render("funcionario/adminAgenda")
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
app.get('/delete/:titulo',async (req,res)=>{
    const filtro = {titulo: req.params.titulo}
    await mongo.dellPost(filtro)
    console.log(filtro)
    res.redirect('/funcionario/FuncPage')
})


module.exports = router