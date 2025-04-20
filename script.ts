import express from "express"
import apiRouter from "./src/routes/api/api.routes.js"
import bodyParser from 'body-parser'
import webRouter from "./src/routes/web/web.routes.js"
import { connectDb } from "./src/db/db.js"
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.set('view engine', 'ejs');
app.set("views" , join(__dirname, "views"))
app.use(express.static('public'))
app.use('/public', express.static('public'))
app.use(bodyParser.json())

connectDb()

app.use("/api" , apiRouter)
app.use("/" , webRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

