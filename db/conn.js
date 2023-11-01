const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('prova','root','senai',{
    dialect : 'mysql',
    host : 'localhost'
})

// sequelize.authenticate().then(()=>{
//     console.log(`Banco de Dados conectado`)
// }).catch((err)=>{
//     console.log(`Banco de Dados não conectado devido ao erro ${err}`)
// })

module.exports = sequelize