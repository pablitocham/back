import express from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import MongoStore from "connect-mongo"
import handlebars from "express-handlebars"
import { __dirname } from "./dirname.js"
import path from "path"
import { viewsRouter } from "./routes/views.routes.js"
import { sessionRouter } from "./routes/session.routes.js"


const app = express()
const PORT = 1234
const SECRET = "secretKey"
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


mongoose.connect("mongodb://localhost:27017/5_login")
    .then(() => console.log("Conexión Exitosa"))
    .catch(err => console.log("Error al conectarse a la Base de datos", err))

app.use(session({
    secret: SECRET,
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/5_login",
       //ttl: 4,
        retries: 0
    }),
    resave: false,
    saveUninitialized: false
}))

app.engine("hbs", handlebars.engine({ extname: ".hbs", defaultLayout: "main" }))

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))

app.use("/", viewsRouter)
app.use("/api/sessions", sessionRouter)




app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})