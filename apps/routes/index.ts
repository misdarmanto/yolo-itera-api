/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Express, type Request, type Response } from 'express'
import { index } from '../controllers'
import { VEHICLE } from '../controllers/vehicle'
import { USER } from '../controllers/users'
import { middleware } from '../middlewares'
import { TRAFFIC } from '../controllers/traffic'
import { STATISTIC } from '../controllers/statistic'
import { ADMIN } from '../controllers/admin'
import { uploadFileRoutes } from './upload-file-route'

export const route = (app: Express): any => {
  app.get('/', async (req: Request, res: Response) => await index(req, res))

  const statisticRouter = express.Router()
  app.use('/statistic', middleware.useAuthorization, statisticRouter)
  statisticRouter.get(
    '/',
    async (req: Request, res: Response) => await STATISTIC.all(req, res)
  )

  const userRouter = express.Router()
  app.use('/users', middleware.useAuthorization, userRouter)
  userRouter.get(
    '/list',
    async (req: Request, res: Response) => await USER.list(req, res)
  )
  userRouter.get('/', async (req: Request, res: Response) => await USER.single(req, res))
  userRouter.post('/', async (req: Request, res: Response) => await USER.create(req, res))
  userRouter.patch(
    '/',
    async (req: Request, res: Response) => await USER.update(req, res)
  )
  userRouter.delete(
    '/',
    async (req: Request, res: Response) => await USER.delete(req, res)
  )

  const adminRouter = express.Router()
  app.use('/admin', middleware.useAuthorization, adminRouter)
  adminRouter.patch(
    '/',
    async (req: Request, res: Response) => await ADMIN.update(req, res)
  )
  adminRouter.delete(
    '/',
    async (req: Request, res: Response) => await ADMIN.delete(req, res)
  )
  adminRouter.get(
    '/list',
    async (req: Request, res: Response) => await ADMIN.list(req, res)
  )
  adminRouter.post(
    '/register',
    async (req: Request, res: Response) => await ADMIN.registration(req, res)
  )
  adminRouter.post(
    '/login',
    async (req: Request, res: Response) => await ADMIN.login(req, res)
  )
  adminRouter.get(
    '/logout',
    async (req: Request, res: Response) => await ADMIN.logout(req, res)
  )

  const vehicleRouter = express.Router()
  app.use('/vehicles', middleware.useAuthorization, vehicleRouter)
  vehicleRouter.get(
    '/',
    async (req: Request, res: Response) => await VEHICLE.single(req, res)
  )
  vehicleRouter.get(
    '/list',
    async (req: Request, res: Response) => await VEHICLE.list(req, res)
  )
  vehicleRouter.post(
    '/',
    async (req: Request, res: Response) => await VEHICLE.create(req, res)
  )
  vehicleRouter.patch(
    '/',
    async (req: Request, res: Response) => await VEHICLE.update(req, res)
  )
  vehicleRouter.delete(
    '/',
    async (req: Request, res: Response) => await VEHICLE.delete(req, res)
  )

  const trafficRouter = express.Router()
  app.use('/traffic', middleware.useAuthorization, trafficRouter)
  trafficRouter.post(
    '/verify',
    async (req: Request, res: Response) => await TRAFFIC.verify(req, res)
  )
  trafficRouter.get(
    '/list',
    async (req: Request, res: Response) => await TRAFFIC.list(req, res)
  )
  trafficRouter.get(
    '/detail/:trafficId',
    async (req: Request, res: Response) => await TRAFFIC.single(req, res)
  )
  uploadFileRoutes(app)
}
