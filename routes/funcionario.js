const { application, Router } = require('express')
const express = require('express')
const router = express.Router()


//gets
router.get('/UBS',(req,res)=>{
    res.render('funcionario/adminUBS')
})
router.get('/FuncPage',(req,res)=>{
    res.render('funcionario/funcionario')
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
    const obj = {
        tipo: 'Funcionario',
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        telefone: req.body.telefone,
        cpf: req.body.cpf,
        endereço: {
            rua: req.body.rua,
            bairro: req.body.bairro,
            cidade: req.body.cidade
        },
        nascimento: req.body.data,
        função: req.body.função,
        salario: req.body.salario,
        dataAdmissao: req.body.dataAdmissao
    }
    console.log(obj)
})


module.exports = router