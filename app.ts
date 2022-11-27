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

// Router definitions
app.routes = route(app)

export { app }