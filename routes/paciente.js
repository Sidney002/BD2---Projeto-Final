const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('base')
})

router.get('/test', (req,res)=>{
    res.render('index')
})

module.exports = router