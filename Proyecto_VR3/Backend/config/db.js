import {Sequelize} from 'sequelize'

const db = new Sequelize('timv1','root','root',{
    host:'localhost',
    dialect: 'mysql'
})

export default db