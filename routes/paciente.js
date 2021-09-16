const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
    res.render('index')
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
    res.render('cadastrar')
})

module.exports = router