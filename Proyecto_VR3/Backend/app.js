import express  from "express"
import cors from 'cors'
import db from "./config/db.js"
import routerUser from './routes/user.routes.js'
import routerProspect from "./routes/prospecto.routes.js"


const app = express()

app.use(cors())
app.use(express.json())
app.use('/users', routerUser)
app.use('/usuario_prospecto', routerProspect)

try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}

app.listen(5000, ()=>{
    console.log('Server UP running in http://localhost:5000/')
})