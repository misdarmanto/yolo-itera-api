import { route } from "./apps/routes"
import { CONFIG } from "./apps/config"
import express, { Express } from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from 'cors';

/** Create an new instance of `Appication` */
const app: Express = express()
app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Authorization, Content-Type')
    next()
})

// Router definitions
app.routes = route(app)

const PORT = CONFIG.port
app.listen(PORT, () => console.log(`listening on ${PORT}`))