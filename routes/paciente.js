const express = require('express')
const router = express.Router()

//gets
router.get('/', (req,res)=>{
    if(!req.session.login){
        res.render('index')
    }
    else{
        res.render('logado/indexLogado')
    }
})

router.get('/Noticias',(req,res)=>{
    res.render('noticias')
})

router.get('/Entrar', (req,res)=>{
    res.render('logar')
})

router.get('/Sobre', (req,res)=>{
    res.render('sobre')
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
    res.render("logado/userPage")
})
router.get('/Agendamentos',(req,res)=>{
    res.render('logado/agenda')
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
        descrição: req.body.descrição
    }
    console.log(obj)
    res.redirect('Agendamentos')
})
router.post('/fazerLogin',(req,res)=>{
    const usr = req.body.email
    console.log(usr)
    const usrSenha =  req.body.senha
    console.log(usrSenha)

    if(JSON.stringify("caiosidney@gmail.com") == JSON.stringify(usr)){

        if(JSON.stringify("123456") == JSON.stringify(usrSenha)){

            req.session.login = "teste.teste.teste"
            console.log(req.session.login)

            console.log("login realizado com sucesso!");
            res.redirect("Perfil")
            
        }else{
            console.log('error','senha incorreta')
            res.render('logar')
        }

    }else{
        console.log('error','email não encontrado')
        res.render('logar')
    }
})

router.post('/cadastro',(req,res)=>{
    if(req.body.senha == req.body.confirmSenha){
        const obj = {
            tipo: 'Paciente',
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            telefone: req.body.telefone,
            SUS: req.body.SUS,
            cpf: req.body.cpf,
            endereço: {
                rua: req.body.rua,
                bairro: req.body.bairro,
                cidade: req.body.cidade
            },
            sexo: req.body.sexo,
            nascimento: req.body.data
        }

        console.log(obj)
        res.redirect('Perfil')
    }else{
        console.log("as senhas não batem")
    }

})
//deslogar user



module.exports = router