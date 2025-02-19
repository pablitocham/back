import express from "express"
import cookieParser from "cookie-parser"

const app = express();
const PORT = 1234

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static("public"));


//seteo de cookies que enviamos al cliente
app.post("/setCookie", (req, res) => {
    const { name, email } = req.body
    res.cookie("name", name,{maxAge:3000})

    res.cookie("email", email,{maxAge:3000})

    res.send(`Nombre: ${name}, Email: ${email}`);//para que se vea en texto
    // res.send({ name: req.cookies.name, email: req.cookies.email }); para que se vea en json
})

app.get("/getCookie", (req, res) => {
    const cookies = req.cookies
    res.send(cookies)
})

app.get("/deleteCookie", (req, res) => {
    res.clearCookie("name")
    res.clearCookie("email")
    res.json({ message: "Cookie eliminadas" })
})















app.listen(PORT, () => {
    console.log(`Server running port a http://localhost:${PORT}`)
})