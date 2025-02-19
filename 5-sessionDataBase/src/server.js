import express from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import MongoStore from "connect-mongo"

const app = express()
const PORT = 1234
const SECRET = "claveSecreta"
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
//const mongoUser= 
//const mongoPassword =
//const mongoUR= `mongodb+srv://${mongoUsr}:${mongoPassword}@cluster0.rbohw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// app.use(session({
//     secret: SECRET,
//     store: MongoStore.create({
//         path:`./sessions`,
//         ttl: 4,
//         retries:0
//     }),
//     resave:false,
//     saveUninitialized:false
// }))

mongoose.connect("mongodb://localhost:27017/mis_sesiones")
    .then(() => console.log("Conexión Exitosa"))
    .catch(err => console.log("Error al conectarse a la Base de datos", err))

app.use(session({
    secret: SECRET,
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/mis_sesiones",
        ttl: 4,
        retries: 0
    }),
    resave: false,
    saveUninitialized: false
}))



app.get("/", (req, res) => {
    console.log(req.session)
    if (req.session.counter) {
        req.session.counter++
        res.send(`Counter: ${req.session.counter}`)
    } else {
        req.session.counter = 1
        res.send("Bienvenidooooooo")
    }
})










app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})