import express from "express"
import cookieParser from "cookie-parser"

const app = express()
const PORT = 1234;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use(cookieParser("laClave"))//ponemos clave PERO OJO NO QUEDA ACA

app.get("/set-cookie", (req, res) => {
    res.cookie("coderCookie", "nueva Coder cookie")
    res.json({ message: "Cookie Set" })
})

//firmamos
app.get("/set-signed-cookie", (req, res) => {
    res.cookie("signedCookie", "Cookie firmada", { signed: true })
    res.json({ message: "Signed cookie Set" })
})

//vemos las cookie firmadas
app.get("/get-cookies", (req, res) => {
    res.json({ cookies: req.cookies, signed: req.signedCookies })
})

app.get("/delete-cookies", (req, res) => {
    res.clearCookie("coderCookie")
    res.json({ message: "Coder cookie eliminada" })
})














app.listen(PORT, () => {
    console.log(`Server running port a http://localhost:${PORT}`)
})