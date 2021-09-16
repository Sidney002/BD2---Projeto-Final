const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('base')
})

router.get('/logar', (req,res)=>{
    res.render('index')
})
router.get('/blabla', (req, res)=> {
    
    res.render('cadastrar')
})

module.exports = router