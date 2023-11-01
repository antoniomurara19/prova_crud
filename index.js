const express = require('express')
const app = express()
const conn = require('./db/conn')
const Gerente = require('./models/Gerente')
const Setor = require('./models/Setor')
const Atividade = require('./models/Atividade')
const handlebars = require('express-handlebars')

const port = 3000
const hostname = 'localhost'

let log = false
let nome_gerente = ``

// ======================= express =========================
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
// ======================= handlebars ======================
app.set('view engine','handlebars')
app.engine('handlebars',handlebars.engine())
// =========================================================
// ===================== apagar ============================
app.get('/apagar_atividades',(req,res)=>{
    res.render('apagar_atividades',{log,nome_gerente})
})
app.post('/apagar_atividades', async (req,res)=>{
    const num_atividade = req.body.num_atividade

    const pesq_apagar = await Atividade.findOne({raw:true,where:{num_atividade:num_atividade}})

    if(pesq_apagar.num_atividade === num_atividade){
        Atividade.destroy({raw:true,where:{num_atividade}})
        res.render('home',{log,nome_gerente})
    }else{
        res.render('home',{log,nome_gerente})
    }
})
app.get('/apagar_setores',(req,res)=>{
    res.render('apagar_setores',{log,nome_gerente})
})
app.post('/apagar_setores', async (req,res)=>{
    const num_setor = req.body.num_setor

    const pesq_apagar = await Setor.findOne({raw:true,where:{num_setor:num_setor}})

    if(pesq_apagar.num_setor === num_setor){
        Setor.destroy({raw:true,where:{num_setor}})
        res.render('home',{log,nome_gerente})
    }else{
        res.render('home',{log,nome_gerente})
    }
})
// ===================== atualizar =========================
app.get('/atualizar_atividades',(req,res)=>{
    res.render('atualizar_atividades',{log,nome_gerente})
})
app.post('/atualizar_atividades', async (req,res)=>{
    const id = req.body.id
    const num_atividade = req.body.num_atividade
    const nome_atividade = req.body.nome_atividade
    const setorId = req.body.setorId

    const pesq_atualizar = await Atividade.findOne({raw:true,where:{id:id}})

    if(pesq_atualizar != null){
        const dados_atualizar = {
            id : id,
            num_atividade : num_atividade,
            nome_atividade : nome_atividade,
            setorId : setorId
        }
        if(typeof id == 'string' && typeof num_atividade == 'string' && typeof nome_atividade == 'string' && typeof setorId == 'string'){
            await Atividade.update(dados_atualizar,{where:{id:id}})
            res.render('home',{log,nome_gerente})
        }else{
            res.render('home',{log,nome_gerente})
        }
    }else{
        res.render('home',{log,nome_gerente})
    }
})
app.get('/atualizar_setores',(req,res)=>{
    res.render('atualizar_setores',{log,nome_gerente})
})
app.post('/atualizar_setores', async (req,res)=>{
    const id = req.body.id
    const num_setor = req.body.num_setor
    const nome_setor = req.body.nome_setor
    const gerenteId = req.body.gerenteId

    const pesq_atualizar = await Setor.findOne({raw:true,where:{id:id}})

    if(pesq_atualizar != null){
        const dados_atualizar = {
            id : id,
            num_setor : num_setor,
            nome_setor : nome_setor,
            gerenteId : gerenteId
        }
        if(typeof id == 'string' && typeof num_setor == 'string' && typeof nome_setor == 'string' && typeof gerenteId == 'string'){
            await Setor.update(dados_atualizar,{where:{id:id}})
            res.render('home',{log,nome_gerente})
        }else{
            res.render('home',{log,nome_gerente})
        }
    }else{
        res.render('home',{log,nome_gerente})
    }
})
// ===================== cadastrar =========================
app.get('/cadastrar_atividades',(req,res)=>{
    res.render('cadastrar_atividades',{log,nome_gerente})
})
app.post('/cadastrar_atividades',(req,res)=>{
    const num_atividade = Number(req.body.num_atividade)
    const nome_atividade = req.body.nome_atividade
    const setorId = Number(req.body.setorId)

    if(typeof num_atividade == 'number' && typeof nome_atividade == 'string' && typeof setorId == 'number'){
        Atividade.create({num_atividade,nome_atividade,setorId})
        res.render('home',{log,nome_gerente})
    }else{
        res.render('home',{log,nome_gerente})
    }
})
app.get('/cadastrar_setores',(req,res)=>{
    res.render('cadastrar_setores',{log,nome_gerente})
})
app.post('/cadastrar_setores',(req,res)=>{
    const num_setor = Number(req.body.num_setor)
    const nome_setor = req.body.nome_setor
    const gerenteId = Number(req.body.gerenteId)

    if(typeof num_setor == 'number' && typeof nome_setor == 'string' && typeof gerenteId == 'number'){
        Setor.create({num_setor,nome_setor,gerenteId})
        res.render('home',{log,nome_gerente})
    }else{
        res.render('home',{log,nome_gerente})
    }
})
// ======================= listar ==========================
app.get('/listar_atividades', async (req,res)=>{
    const dados = await Atividade.findAll({raw:true})
    console.log(dados)
    res.render('listar_atividades',{log,nome_gerente,dados:dados})
})
app.get('/listar_setores', async (req,res)=>{
    const dados = await Setor.findAll({raw:true})
    console.log(dados)
    res.render('listar_setores',{log,nome_gerente,dados:dados})
})
// =================== renderizar ==========================
app.get('/home',(req,res)=>{
    log = false
    res.render('login',{log,nome_gerente})
})
app.get('/logout',(req,res)=>{
    log = false
    res.render('login',{log,nome_gerente})
})
// ==================== login ==============================
app.post('/', async (req,res)=>{
    const email = req.body.email
    const senha = req.body.senha

    const pesq_login = await Gerente.findOne({raw:true,where:{email:email,senha:senha}})

    if(pesq_login.email == email && pesq_login.senha == senha){
        log = true
        nome_gerente = pesq_login.email
        res.render('home',{log,nome_gerente})
    }else{
        res.render('login',{log,nome_gerente})
    }
})
app.get('/',(req,res)=>{
    res.render('login',{log,nome_gerente})
})
// =========================================================
conn.sync().then(()=>{
    app.listen(port,hostname,()=>{
        console.log(`Servidor ${hostname} rodando em ${port}`)
    })
}).catch((err)=>{
    console.log(`Servidor não está rodando devido ao erro ${err}`)
})