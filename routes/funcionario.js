const express = require('express')
const router = express.Router()

router.get('',(req,res)=>{
    res.render('funcionario/funcionario')
})
router.get('/TipoFuncionario',(req,res)=>{
    res.render('funcionario/cadastrar')
})
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