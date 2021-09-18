const express = require('express');
const app = express();
const session = require('express-session');
const flash =  require("connect-flash");
const path = require('path');
const bodyparser = require('body-parser');
const nunjucks = require('nunjucks');
const paciente = require('./routes/paciente')
const funcionario = require('./routes/funcionario')
const user = require('./databases/postgres')
const post = require('./databases/mongo')
const agenda = require('./databases/redis')

//Configuração   
    //public
    app.use(express.static(path.join(__dirname,"public")))
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(session({
        secret: "456123843",
        resave: true,
        saveUninitialized: true
    }));
    app.use(flash())
    //bodyparser
    app.use(bodyparser.urlencoded({extended: true}))
    app.use(bodyparser.json())
    //template engine nunjucks
    app.set('view engine','njk')

    nunjucks.configure('views', {
        express:app,
        autoescape: false,
        noCache: true
    })
    //middlewares
    app.use((req,res,next) => {
        res.locals.success = req.flash("success")
        res.locals.error = req.flash("error")
        next()
    })

    //Rotas
    app.use('/paciente', paciente)
    app.use('/funcionario', funcionario)

const port = 6006;
app.listen(port,()=>{
    console.log("Aplicação esta rodando na porta " + port)
})
