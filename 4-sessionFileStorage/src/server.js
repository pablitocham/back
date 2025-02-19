import express from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import FileStore from "session-file-store"



const app = express()
const PORT = 1234
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const fileStorage = FileStore(session)
const SECRET = "claveSecreta"

app.use(session({
    secret: SECRET,
    //generamos rutas y guardamos localmente
    store: new fileStorage({
        path: `./sessions`,
        ttl:4, //hace espirar la session 
        retries:0
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
    console.log(`Server runnig on port http://localhost:${PORT}`)
})