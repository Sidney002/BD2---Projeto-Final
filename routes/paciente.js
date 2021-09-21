const express = require('express')
const usuario= require('../databases/postgres')
const postagens = require('../databases/mongo')
const set  = require('../databases/redis')
const router = express.Router()
const agenda = require('../databases/redis')

//gets
router.get('/', async(req,res)=>{

    const posts = await postagens.getPost()
    if(!req.session.login){
        res.render('index',{posts:posts})
        
    }
    else{
        res.render('logado/indexLogado',{posts:posts})
    }
})

router.get ('/Noticias/:titulo', async (req,res)=>{
    const posts = await postagens.getPostFilter(req.params.titulo)
    res.render('noticias',{posts:posts})
})

router.get('/Entrar', (req,res)=>{
    res.render('logar')
})

router.get('/Ver-UBS', (req,res)=>{
    res.render('UBS')
})
router.get('/Cadastrar', (req,res)=>{
    res.render('tipo')
})
router.get('/TipoPaciente',(req,res)=>{
    res.render("cadastrar")
})
router.get('/Perfil',(req,res)=>{
    res.render("logado/userPage", {dados: req.session.login})
})
router.get('/Agendamentos', async(req,res)=>{
    agenda.Redis_client.get(req.session.login.nome, (err,value)=>{
        if(err) throw err
        let at = JSON.parse(value)
        res.render('logado/agenda', {agen : at})
        })
})
router.get('/Agendar',(req,res)=>{
    res.render('logado/novoAgendamento')
})
router.get('/sair',(req,res)=>{
    req.session.login = null
    res.redirect('/paciente/')
})

//posts
router.post('/adicionarAgendamento',(req,res)=>{
        const obj = {
        tipo: req.body.tipo,
        titulo: req.body.motivo,
        descricao: req.body.descricao
    } 
    const key = req.session.login.nome;
    agenda.set(key, obj)
    
    res.redirect('Agendamentos')
})


router.post('/fazerLogin', async(req,res)=>{
    const usr = {email:req.body.email}
    const usrSenha =  {senha:req.body.senha}
    //const funcUser = await usuario.getUserFunc(req.session.login.email)
    


    if(JSON.stringify(await usuario.getUserEmailPac(req.body.email)) == JSON.stringify(usr) || JSON.stringify(await usuario.getUserEmailFunc(req.body.email)) == JSON.stringify(usr)){

        if(JSON.stringify(await usuario.getUserPasswordPac(req.body.email)) == JSON.stringify(usrSenha) || JSON.stringify(await usuario.getUserPasswordFunc(req.body.email)) == JSON.stringify(usrSenha)){

            req.session.login = await usuario.getUserPac(req.body.email)
            
            if (await usuario.getUserPac(req.body.email)) {
                req.session.login = await usuario.getUserPac(req.body.email)
                res.redirect("Perfil")
                console.log("login realizado com sucesso!");
            }

            else if (await usuario.getUserFunc(req.body.email)) {
                req.session.login = await usuario.getUserFunc(req.body.email)
                res.redirect("/funcionario/FuncPage")
                console.log("login realizado com sucesso!");
                
            } 

            
            
            
        }else{
            console.log('error','senha incorreta')
            res.render('logar')
        }

    }else{
        console.log('error','email não encontrado')
        res.render('logar')
    }
})

router.post('/cadastro', async (req,res)=>{
    if(req.body.senha == req.body.confirmSenha){
        const obj = {
            tipo: 'paciente',
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            telefone: req.body.telefone,
            sus: req.body.SUS,
            cpf: req.body.cpf,
            endereco: {
                rua: req.body.rua,
                bairro: req.body.bairro,
                cidade: req.body.cidade
            },
            sexo: req.body.sexo,
            nascimento: req.body.data
        }
        
        usuario.setNewUser(obj);
        req.session.login = await usuario.getUserPac(req.body.email)
        res.redirect('Perfil')
    }else{
        console.log("as senhas não batem")
    }

})


const UBS = require("../controler");
    router.get("/destiny", UBS.BuscarUBS);

//deslogar user



module.exports = router