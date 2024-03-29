import { route } from './apps/routes/v1'
import { CONFIG } from './apps/configs'
import express, { type Express } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app: Express = express()
app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, content-type, Authorization, Content-Type'
  )
  next()
})

app.use('/public', express.static('public'))

app.routes = route(app)

const PORT = CONFIG.port
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}/api/v1`)
})

export { app }
