const { application, Router } = require('express')
const usuario= require('../databases/postgres')
const express = require('express')
const router = express.Router()


//gets
router.get('/UBS',(req,res)=>{
    res.render('funcionario/adminUBS')
})
router.get('/FuncPage', async (req,res)=>{
    res.render('funcionario/funcionario' , {dados: req.session.login})

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
router.get('/edit',(req,res)=>{
    res.render("funcionario/editNoticias")
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


module.exports = router