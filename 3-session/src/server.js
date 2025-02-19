import express from "express"
import session from "express-session"


const app = express()
const PORT = 1234
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//firmanos la session
app.use(session({
    secret: "miSecretkey",
    resave: true,//guarda sesiones
    saveUninitialized: true//rastrea visitas aunque el ususario no haya hecho login
}))

app.get("/session", (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`visitna: ${req.session.counter}`)
    } else {
        req.session.counter = 1
        res.send("Bienvenido")
    }
})

app.get("/login", (req, res) => {
    const { username, password } = req.query
    if (username !== "admin" || password !== "1234") {
        return res.status(401).send("Nombre de usuario Invalido")
    }
    const user = req.session.username = username
    const role = req.session.admin = true
    res.send(`Login succes: ${user} - ${role} - \n<p>password:${password}</p>`)

})

app.get("/profile", auth, (req, res) => {

    if (req.session.counter > 1) {
        res.send(`Bienvenido ${req.session.username}`)
    }
})
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("No se pudo cerrar la sesión");
        }
        res.send("Sesión cerrada");
    });

})

function auth(req, res, next) {
    if (!req.session.username) {
        return res.status(401).send("Debes Loguearte primero")
    }
    if (req.session.username === "admin" && req.session?.admin) {
        return next()
    }
    res.status(401).send(`Tiene que ser administrador`)
}


//falta profile y counter










app.listen(PORT, () => {
    console.log(`Server running port a http://localhost:${PORT}`)
})